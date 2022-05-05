import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SnackbarContent, SnackbarKey, useSnackbar } from "notistack";
import { forwardRef, ReactChild, ReactElement, useCallback, useMemo } from "react";


const getImageBox = (theme: Theme, variant?: NotificationVariant, image?: ReactChild, sx?: SxProps<Theme>) => {
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
        <Box sx={sx}>
            {image}
        </Box>
    );
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>((props, ref) => {
    const { snackbarKey: key, title, content, close, variant, image, actions } = props;

    const { closeSnackbar } = useSnackbar();
    const theme = useTheme();

    const imageBox = useMemo(() =>
        getImageBox(theme, variant, image, { pr: 4 }), [theme, variant, image]
    );

    const handleDismiss = useCallback(() => {
        closeSnackbar(key);
    }, [closeSnackbar, key]);

    return (
        <SnackbarContent ref={ref}>
            <Card elevation={3}>
                <CardContent
                    sx={{
                        minWidth: 288,
                        ':last-child': {
                            pb: 4,
                        },
                    }}
                >
                    <Box display="flex" justifyContent="center" alignItems="start">
                        {imageBox}
                        <Box flexGrow={1}>
                            <Typography variant="body2" fontWeight={500}>{title}</Typography>
                            {content ?
                                <Typography variant="body2" color="textSecondary" mt={1}>
                                    {content}
                                </Typography> :
                                ''
                            }
                        </Box>
                        {close ?
                            <IconButton
                                aria-label="close"
                                size="small"
                                sx={{ ml: 4 }}
                                onClick={handleDismiss}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton> :
                            ''
                        }
                    </Box>
                    {actions ?
                        <Box mt={4}>
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
