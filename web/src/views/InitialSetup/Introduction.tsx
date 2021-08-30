import { makeStyles, Typography, createStyles, Box } from "@material-ui/core";
import { useEffect } from "react";
import { StepContentProps } from "./StepContentProps";
import AppreciationSecondaryImage from "./appreciation_secondary.svg";

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

export default function Introduction(props: StepContentProps) {
    const { nextClicked, triggerNext } = props;
    const classes = useStyles();

    useEffect(() => {
        if (nextClicked) triggerNext();
    }, [nextClicked, triggerNext]);

    return (
        <Box className={classes.root}>
            <img src={AppreciationSecondaryImage} alt="Launching" className={classes.image} />
            <Typography className={classes.text}>感謝您使用 Conote</Typography>
            <Typography className={classes.text}>
                在接下來的步驟中，你將會建立系統管理員使用者，往後要更改系統設定時，請使用該帳號登入。
            </Typography>
            <Typography className={classes.text}>
                事不宜遲，我們開始吧~
            </Typography>
        </Box>
    );
}
