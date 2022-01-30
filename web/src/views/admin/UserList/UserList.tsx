import { Avatar, Box, Button, Card, Chip, IconButton, Typography } from "@mui/material";
import Papa from 'papaparse';
import AppLayout from "../../../components/AppLayout/AppLayout";
import PageHeading from "../../../components/PageHeading/PageHeading";
import DataTable from "../../../components/DataTable/DataTable";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation, useQuery } from "@apollo/client";
import { USER_CONNECTION } from "../../../graphql/queries/user";
import { Connection, GraphqlDto, OrderDirection } from "../../../graphql/type/type";
import { User, UserConnectionArgs, UserOrder, UserRole, UserStatus } from "../../../graphql/type/user";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { CREATE_MULTIPLE_USERS } from "../../../graphql/mutations/user";
import { BatchPayload } from "../../../graphql/type/BatchPayload";
import { columnsField } from "./constant";
import { matchAccept } from "../../../utils/file";
import { useNotification } from "../../../components/Notification";

/* const useStyles = makeStyles(theme =>
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
); */

export default function UserList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [order, setOrder] = useState<UserOrder>(undefined);
    const [importLoading, setImportLoading] = useState(false);
    const input = useRef<HTMLInputElement>(null);

    const { data, networkStatus, refetch } = useQuery<GraphqlDto<'user', Connection<User>>>(
        USER_CONNECTION,
        { variables: { first: pageSize }, notifyOnNetworkStatusChange: true },
    );
    const [createMultipleUsers] = useMutation<GraphqlDto<'createMultipleUsers', BatchPayload>>(CREATE_MULTIPLE_USERS);
    const { enqueueNotification } = useNotification();

    // data map types
    const users = useMemo(
        () => data ? data.user.edges.map((edge) => ({ ...edge.node })) : [],
        [data],
    );
    const count = data ? data.user.count : 0;
    const baseVariable: UserConnectionArgs = useMemo(() => ({
        first: undefined,
        after: undefined,
        last: undefined,
        before: undefined,
        query: searchText ? searchText : undefined,
        order,
    }), [searchText, order]);

    const handleChangePage = useCallback(async (newPage: number, newPageSize: number) => {
        if (newPage - page === 1) {
            // next page
            const cursor = data?.user.pageInfo.endCursor;
            await refetch({...baseVariable, ...{ first: newPageSize, after: cursor }});
        } else if (newPage - page === -1) {
            // previous page
            const cursor = data?.user.pageInfo.startCursor;
            await refetch({...baseVariable, ...{ last: newPageSize, before: cursor }});
        } else if (newPage === 0) {
            // first page
            await refetch({...baseVariable, ...{ first: newPageSize }});
        } else if (newPage === Math.ceil(count / pageSize) - 1) {
            // last page
            const last = count % newPageSize ? count % newPageSize : newPageSize;
            await refetch({...baseVariable, ...{ last }});
        }

        setPage(newPage);
        setPageSize(newPageSize);
    }, [page, pageSize, data, refetch, baseVariable, count, setPage, setPageSize]);

    const handleSearchChange = useCallback(async (newSearchText: string) => {
        if (newSearchText) await refetch({...baseVariable, ...{ first: pageSize, query: newSearchText }});
        else await refetch({...baseVariable, ...{ first: pageSize, query: undefined }});

        setSearchText(newSearchText);
        setPage(0);
    }, [refetch, baseVariable, pageSize]);

    const handleOrderChange = useCallback(async (orderBy: number, orderDirection: 'asc' | 'desc' | '') => {
        if (orderBy === -1) {
            await refetch({ ...baseVariable, ...{ first: pageSize, order: undefined } });

            setOrder(undefined);
            setPage(0);
        } else {
            const order: UserOrder = { direction: orderDirection.toUpperCase() as OrderDirection, field: columnsField[orderBy] };

            await refetch({ ...baseVariable, ...{ first: pageSize, order } });

            setOrder(order);
            setPage(0);
        }
    }, [refetch, baseVariable, pageSize]);

    // Fix sort direction always displays asc
    const getColumnDefaultSort = useCallback((index: number) => {
        const columnOrderName = columnsField[index];
        return order && columnOrderName === order.field ? order.direction.toLowerCase() as ('asc' | 'desc') : undefined;
    }, [order]);

    // Disable inbuit sort algorithm
    const customSort = useCallback(() => 0, []);

    // Simulate input click when import button clicked. 
    const handleImportClick = useCallback(() => {
        if (input.current) input.current.click();
    }, [input]);

    // Handle import input change and resolve csv to create users
    const handleInputChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        const accept = '.csv';
        if (files.length > 0) {
            const file = files[0];
            if (!matchAccept(accept, file)) {
                enqueueNotification({
                    variant: 'error',
                    title: '檔案格式錯誤',
                    content: `你只能匯入格式為 ${accept} 的檔案。`,
                });
                return;
            }

            setImportLoading(true);

            const content = await file.text();
            const result = Papa.parse(content, { header: true, skipEmptyLines: 'greedy' });

            // check validity of data
            if (result.errors.length > 0) {
                enqueueNotification({
                    variant: 'error',
                    title: '檔案格式錯誤',
                    content: '請提供格式正確的 csv 檔。',
                });
                setImportLoading(false);
                return;
            }

            const expectedFields = ['name', 'studentId', 'role'];
            const fields = result.meta.fields;
            if (fields &&
                fields.length === expectedFields.length &&
                fields.every((v, i) => v === expectedFields[i])
            ) {
                const response = await createMultipleUsers({
                    variables: {
                        input: { items: result.data },
                    },
                });
                const updatedCount = response.data?.createMultipleUsers.count;
                if (updatedCount > 0) {
                    enqueueNotification({
                        variant: 'success',
                        title: '成功匯入使用者',
                        content: `已匯入 ${updatedCount} 筆資料。`,
                    });
                } else {
                    enqueueNotification({
                        variant: 'info',
                        title: '未更新使用者資料',
                        content: '匯入的使用者皆已存在。',
                    });
                }
                
                await refetch({ first: pageSize });
            } else {
                enqueueNotification({
                    variant: 'error',
                    title: '缺少必填欄位',
                    content: 'csv 檔必須包含 name, studentId, role 欄位。',
                });
            }

            setImportLoading(false);
        }
    }, [enqueueNotification, createMultipleUsers, refetch, pageSize]);

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
                <Button variant="outlined" color="primary" disabled={importLoading} onClick={handleImportClick}>
                    匯入使用者
                </Button>
                <Button variant="contained" color="primary" sx={{ ml: 3 }}>
                    新增使用者
                </Button>
            </PageHeading>
            <Card sx={{ my: 6 }}>
                {/* <DataTable
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
                            defaultSort: getColumnDefaultSort(0),
                            customSort,
                        },
                        { field: 'studentId', title: '學號', defaultSort: getColumnDefaultSort(1), customSort, },
                        { field: 'email', title: 'Email', defaultSort: getColumnDefaultSort(2), customSort, },
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
                            defaultSort: getColumnDefaultSort(3),
                            customSort,
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
                            },
                            defaultSort: getColumnDefaultSort(4),
                            customSort,
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
                        debounceInterval: 250,
                        pageSize: pageSize,
                        pageSizeOptions: [10, 50],
                    }}
                    onChangePage={handleChangePage}
                    onSearchChange={handleSearchChange}
                    onOrderChange={handleOrderChange}
                /> */}
            </Card>
        </AppLayout>
    );
}
