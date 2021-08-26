import { Avatar, Box, Button, Card, Chip, createStyles, IconButton, makeStyles, Typography } from "@material-ui/core";
import AppLayout from "../../../components/AppLayout/AppLayout";
import PageHeading from "../../../components/PageHeading/PageHeading";
import DataTable from "../../../components/DataTable/DataTable";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    }),
);

export default function UserList() {
    const classes = useStyles();

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
                                    <Avatar>{data.name.charAt(0)}</Avatar>
                                    <Typography variant="subtitle1" className={classes.tableSubtitle}>
                                        {data.name}
                                    </Typography>
                                </Box>,
                        },
                        { field: 'studentId', title: '學號' },
                        { field: 'classes', title: '班級' },
                        { field: 'role', title: '角色' },
                        { field: 'status', title: '狀態', render: data => <Chip color="secondary" label={data.status} /> },
                        {
                            render: () => <IconButton size="small"><MoreVertIcon /></IconButton>,
                            align: 'right',
                            width: '5%',
                            sorting: false
                        },
                    ]}
                    data={[
                        { name: '趙子賢', studentId: 'u108001058', classes: 'M108', role: '系統管理員', status: '活躍' },
                    ]}
                    options={{
                        selection: true,
                    }}
                />
            </Card>
        </AppLayout>
    );
}
