import { Avatar, Box, createStyles, Divider, Link, makeStyles, Typography } from "@material-ui/core";
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DrawerVariant } from "./types";
import { MouseEvent } from "react";
import { forwardRef } from "react";

const useStyles = makeStyles(theme =>
    createStyles({
        infoBox: {
            padding: theme.spacing(5),
        },
        icon: {
            fontSize: '40px',
        },
        link: {
            cursor: 'pointer',
        },
        linkFlex: {
            display: 'flex',
            alignItems: 'center',
        },
        linkTypography: {
            marginLeft: theme.spacing(2),
        },
        flex: {
            marginTop: theme.spacing(6),
            display: 'flex',
            alignItems: 'center',
        },
        infoTextBox: {
            marginLeft: theme.spacing(4),
        },
    }),
);

const DrawerInfoPanel = forwardRef<HTMLSpanElement, DrawerInfoPanelProps>((props, ref) => {
    const { variant, onGoBackClick } = props;

    const classes = useStyles();

    const handleGoBackLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onGoBackClick();
    }

    return (
        <>
            <Box className={classes.infoBox}>
                {variant === 'default' ?
                    <LocalLibraryOutlinedIcon color="primary" className={classes.icon} /> :
                    <>
                        <Link
                            ref={ref}
                            underline="hover"
                            color="textSecondary"
                            className={classes.link}
                            onClick={handleGoBackLinkClick}
                        >
                            <Box className={classes.linkFlex}>
                                <ArrowBackIcon fontSize="small" />
                                <Typography variant="body2" className={classes.linkTypography}>返回主選單</Typography>
                            </Box>
                        </Link>
                        <Box className={classes.flex}>
                            <Avatar />
                            <Box className={classes.infoTextBox}>
                                <Typography variant="subtitle2">趙子賢</Typography>
                                <Typography variant="body2" color="textSecondary">系統管理員</Typography>
                            </Box>
                        </Box>
                    </>
                }
            </Box>
            {variant === 'admin' ? <Divider /> : ''}
        </>
    );
});

interface DrawerInfoPanelProps {
    variant: DrawerVariant;
    onGoBackClick: GoBackClickCallback;
}

type GoBackClickCallback = () => void;

export default DrawerInfoPanel;
