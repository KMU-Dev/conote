import { makeStyles, createStyles, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { StepContentProps } from "./StepContentProps";
import LaunchingImage from "./launching.svg";
import routes from "../../constant/routes.json";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            padding: theme.spacing(2, 6),
        },
        image: {
            width: '100%',
            maxHeight: '220px',
            padding: theme.spacing(6),
        },
        text: {
            fontWeight: 'lighter',
            margin: theme.spacing(4, 0),
        },
    }),
);

export default function Finish(props: StepContentProps) {
    const { nextClicked } = props;
    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        if (nextClicked) history.replace(routes.LOGIN);
    }, [nextClicked, history]);

    return (
        <Box className={classes.root}>
            <img src={LaunchingImage} alt="Launching" className={classes.image} />
            <Typography className={classes.text}>Conote 已完成設定</Typography>
            <Typography className={classes.text}>
                從現在起，你可以立即享受 Conote 在管理共筆、維護影片為你帶來的便利，如果喜歡這個專案，也不妨給開發者一個支持喔。
            </Typography>
        </Box>
    );
}
