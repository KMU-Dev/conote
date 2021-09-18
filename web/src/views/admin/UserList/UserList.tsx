import { Avatar, Box, Button, Card, Chip, createStyles, IconButton, makeStyles, Typography } from "@material-ui/core";
import AppLayout from "../../../components/AppLayout/AppLayout";
import PageHeading from "../../../components/PageHeading/PageHeading";
import DataTable from "../../../components/DataTable/DataTable";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useQuery } from "@apollo/client";
import { USER_CONNECTION } from "../../../graphql/queries/user";
import { Connection, GraphqlDto } from "../../../graphql/type/type";
import { User, UserStatus } from "../../../graphql/type/user";

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

    const { data } = useQuery<GraphqlDto<'user', Connection<User>>>(USER_CONNECTION, { variables: { first: 10 }});
    const users = data ? data.user.edges.map((edge) => ({ ...edge.node })) : [];

    return (
        <AppLayout>
            <PageHeading title="使用者" breadcrumb="admin.users">
                <Button variant="outlined" color="primary">匯入使用者</Button>
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
                            render: data => data.role.charAt(0).toUpperCase() + data.role.slice(1).toLowerCase(),
                        },
                        {
                            field: 'status',
                            title: '狀態',
                            render: data => {
                                switch (data.status) {
                                    case UserStatus.ACTIVE:
                                        return <Chip label={data.status} className={classes.activeChip} />;
                                    case UserStatus.BANNED:
                                        return <Chip color="secondary" label={data.status} />;
                                    case UserStatus.UNVERIFIED:
                                        return <Chip label={data.status} />
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
                    options={{
                        selection: true,
                        pageSize: 10,
                        pageSizeOptions: [10, 50],
                    }}
                />
            </Card>
        </AppLayout>
    );
}
