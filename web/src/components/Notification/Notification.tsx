import { makeStyles, createStyles, Card, CardContent, Box, Typography, IconButton, useTheme, Theme } from "@material-ui/core";
import { SnackbarContent, SnackbarKey, useSnackbar } from "notistack";
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { forwardRef, ReactChild, ReactElement } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

const useStyles = makeStyles(theme =>
    createStyles({
        cardContent: {
            minWidth: '288px',
            '&:last-child': {
                paddingBottom: theme.spacing(4),
            },
        },
        box: {
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
        },
        image: {
            paddingRight: theme.spacing(4),
        },
        title: {
            fontWeight: 500,
        },
        content: {
            marginTop: theme.spacing(1),
        },
        close: {
            marginLeft: theme.spacing(4),
        },
        actions: {
            marginTop: theme.spacing(4),
        },
    }),
);

const getImageBox = (theme: Theme, variant?: NotificationVariant, image?: ReactChild, boxClass?: string) => {
    if (!image && variant) {
        switch (variant) {
            case 'success':
                image = <CheckCircleOutlineRoundedIcon htmlColor={theme.palette.success.main} fontSize="small" />;
                break;
            case 'error':
                image = <ErrorOutlineRoundedIcon htmlColor={theme.palette.error.main} fontSize="small" />
                break;
            case 'warning':
                image = <ReportProblemOutlinedIcon htmlColor={theme.palette.warning.main} fontSize="small" />
                break;
            case 'info':
                image = <InfoOutlinedIcon htmlColor={theme.palette.info.main} fontSize="small" />
                break;
        }
    }

    if (!image) return '';
    return (
        <Box className={boxClass}>
            {image}
        </Box>
    );
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>((props, ref) => {
    const { snackbarKey: key, title, content, close, variant, image, actions } = props;
    const classes = useStyles();

    const { closeSnackbar } = useSnackbar();
    const theme = useTheme();

    const imageBox = useMemo(() =>
        getImageBox(theme, variant, image, classes.image), [theme, variant, image, classes]
    );

    const handleDismiss = useCallback(() => {
        closeSnackbar(key);
    }, [closeSnackbar, key]);

    return (
        <SnackbarContent ref={ref}>
            <Card elevation={3}>
                <CardContent className={classes.cardContent}>
                    <Box className={classes.box}>
                        {imageBox}
                        <Box>
                            <Typography variant="body2" className={classes.title}>{title}</Typography>
                            {content ?
                                <Typography variant="body2" color="textSecondary" className={classes.content}>
                                    {content}
                                </Typography> :
                                ''
                            }
                        </Box>
                        {close ?
                            <IconButton
                                aria-label="close"
                                className={classes.close}
                                size="small"
                                onClick={handleDismiss}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton> :
                            ''
                        }
                    </Box>
                    {actions ?
                        <Box className={classes.actions}>
                            {actions}
                        </Box> :
                        ''
                    }
                </CardContent>
            </Card>
        </SnackbarContent>
    );
});

Notification.defaultProps = {
    close: true,
};

export interface NotificationProps {
    snackbarKey: SnackbarKey;
    title: string;
    content?: string;
    close?: boolean;
    variant?: NotificationVariant;
    image?: ReactChild;
    actions?: ReactElement;
}

type NotificationVariant = 'success' | 'error' | 'warning' | 'info';
