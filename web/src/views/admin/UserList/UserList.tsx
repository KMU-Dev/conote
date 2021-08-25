import { Button, createStyles, makeStyles } from "@material-ui/core";
import AppLayout from "../../../components/AppLayout/AppLayout";
import PageHeading from "../../../components/PageHeading/PageHeading";

const useStyles = makeStyles(theme =>
    createStyles({
        headingButtonMargin: {
            marginLeft: theme.spacing(3),
        }
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
        </AppLayout>
    );
}
