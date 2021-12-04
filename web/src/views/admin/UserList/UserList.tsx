import { Avatar, Box, Button, Card, Chip, createStyles, IconButton, makeStyles, Typography } from "@material-ui/core";
import Papa from 'papaparse';
import AppLayout from "../../../components/AppLayout/AppLayout";
import PageHeading from "../../../components/PageHeading/PageHeading";
import DataTable from "../../../components/DataTable/DataTable";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMutation, useQuery } from "@apollo/client";
import { USER_CONNECTION } from "../../../graphql/queries/user";
import { Connection, GraphqlDto } from "../../../graphql/type/type";
import { User, UserRole, UserStatus } from "../../../graphql/type/user";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { CREATE_MULTIPLE_USERS } from "../../../graphql/mutations/user";
import { BatchPayload } from "../../../graphql/type/BatchPayload";

const useStyles = makeStyles(theme =>
    createStyles({
        headingButtonMargin: {
            marginLeft: theme.spacing(3),
        },
        card: {
            margin: theme.spacing(6, 0),
        },
        flex: {
            display: 'flex',
            alignItems: 'center',
        },
        tableSubtitle: {
            marginLeft: theme.spacing(2),
        },
        activeChip: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.common.white,
        }
    }),
);

export default function UserList() {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const input = useRef<HTMLInputElement>(null);

    const { data, networkStatus, refetch } = useQuery<GraphqlDto<'user', Connection<User>>>(
        USER_CONNECTION,
        { variables: { first: pageSize }, notifyOnNetworkStatusChange: true },
    );
    const [createMultipleUsers] = useMutation<GraphqlDto<'createMultipleUsers', BatchPayload>>(CREATE_MULTIPLE_USERS);

    // data map types
    const users = useMemo(
        () => data ? data.user.edges.map((edge) => ({ ...edge.node })) : [],
        [data],
    );
    const count = data ? data.user.count : 0;

    const handleChangePage = useCallback(async (newPage: number, newPageSize: number) => {
        console.log(`page: ${page}, newPage: ${newPage}, pageSize: ${pageSize}, newPageSize: ${newPageSize}`);

        if (newPage - page === 1) {
            // next page
            const cursor = data?.user.pageInfo.endCursor;
            await refetch({ first: newPageSize, after: cursor, last: undefined, before: undefined });
        } else if (newPage - page === -1) {
            // previous page
            const cursor = data?.user.pageInfo.startCursor;
            await refetch({ first: undefined, after: undefined, last: newPageSize, before: cursor });
        } else if (newPage === 0) {
            // first page
            await refetch({ first: newPageSize, after: undefined, last: undefined, before: undefined });
        } else if (newPage === Math.ceil(count / pageSize) - 1) {
            // last page
            await refetch({ first: undefined, after: undefined, last: count % newPageSize, before: undefined })
        }

        setPage(newPage);
        setPageSize(newPageSize);
    }, [page, pageSize, data, count, refetch, setPage, setPageSize]);

    // Simulate input click when import button clicked. 
    const handleImportClick = useCallback(() => {
        if (input.current) input.current.click();
    }, [input]);

    // Handle import input change and resolve csv to create users
    const handleInputChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files.length > 0) {
            const file = files[0];
            const content = await file.text();
            const users = Papa.parse(content, { header: true });
            await createMultipleUsers({
                variables: {
                    input: { items: users.data },
                },
            });
            await refetch({ first: pageSize });
        }
    }, [createMultipleUsers, refetch, pageSize]);

    return (
        <AppLayout>
            <PageHeading title="使用者" breadcrumb="admin.users">
                <input
                    ref={input}
                    type="file"
                    accept=".csv"
                    autoComplete="off"
                    tabIndex={-1}
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                />
                <Button variant="outlined" color="primary" onClick={handleImportClick}>
                    匯入使用者
                </Button>
                <Button variant="contained" color="primary" className={classes.headingButtonMargin}>
                    新增使用者
                </Button>
            </PageHeading>
            <Card className={classes.card}>
                <DataTable
                    title=""
                    columns={[
                        {
                            field: 'name',
                            title: '名字',
                            render: data => 
                                <Box className={classes.flex}>
                                    <Avatar src={data.picture}>{!data.picture && data.name.charAt(0)}</Avatar>
                                    <Typography variant="subtitle1" className={classes.tableSubtitle}>
                                        {data.name}
                                    </Typography>
                                </Box>,
                        },
                        { field: 'studentId', title: '學號' },
                        { field: 'email', title: 'Email' },
                        {
                            field: 'role',
                            title: '角色',
                            render: data => {
                                switch (data.role) {
                                    case UserRole.ADMIN:
                                        return '系統管理員';
                                    case UserRole.USER:
                                        return '使用者';
                                }
                            },
                        },
                        {
                            field: 'status',
                            title: '狀態',
                            render: data => {
                                switch (data.status) {
                                    case UserStatus.ACTIVE:
                                        return <Chip label="活躍" className={classes.activeChip} />;
                                    case UserStatus.BANNED:
                                        return <Chip color="secondary" label="封鎖" />;
                                    case UserStatus.UNVERIFIED:
                                        return <Chip label="未驗證" />
                                }
                            }
                        },
                        {
                            render: () => <IconButton size="small"><MoreVertIcon /></IconButton>,
                            align: 'right',
                            width: '5%',
                            sorting: false
                        },
                    ]}
                    data={users}
                    page={page}
                    totalCount={count}
                    isLoading={networkStatus < 7}
                    options={{
                        selection: true,
                        grouping: false,
                        draggable: false,
                        pageSize: pageSize,
                        pageSizeOptions: [10, 50],
                    }}
                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChangePage={handleChangePage}
                />
            </Card>
        </AppLayout>
    );
}
