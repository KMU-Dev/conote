import { Button, ButtonTypeMap, Card, CardContent, createStyles, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppLayout from '../../components/AppLayout/AppLayout';
import FileInput from '../../components/FileInput/FileInput';
import PageHeading from '../../components/PageHeading/PageHeading';
import TailwindInput from '../../components/TailwindInput/TailwindInput';
import FolderAdornment from './FolderAdornment';
import VideoFiles from './video_files.svg';

const useStyles = makeStyles(theme =>
    createStyles({
        card: {
            margin: theme.spacing(6, 0),
        },
        cardContent: {
            padding: theme.spacing(6, 4),
            '&:last-child': {
                paddingBottom: theme.spacing(8),
            },
        },
        gridItem: {
            padding: theme.spacing(4, 0),
        },
        formGridContainer: {
            [theme.breakpoints.up("md")]: {
                paddingLeft: theme.spacing(6),
            },
        },
        subtitle: {
            marginTop: theme.spacing(1),
        },
        textFieldMargin: {
            marginTop: theme.spacing(6),
            [theme.breakpoints.up("lg")]: {
                marginTop: theme.spacing(0),
            },
        }
    }),
);

export default function VideoUpload() {
    const classes = useStyles();
    const theme = useTheme();
    const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const btnAdditionalProps = matchSmUp ? { size: 'large' } as Partial<ButtonTypeMap> : undefined;

    return (
        <AppLayout>
            <PageHeading title="上傳影片" breadcrumb="videos.upload">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    {...btnAdditionalProps}
                >
                    上傳
                </Button>
            </PageHeading>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Grid container justifyContent="space-between" spacing={6}>
                        <Grid item xs={12} md={4} /* className={classes.gridItem} */>
                            <Typography variant="h6">影片資訊</Typography>
                            <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
                                這些資訊會公開顯示在網頁上，請注意填寫的內容。
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8} /* className={classes.gridItem} */>
                            <Grid container /* className={classes.formGridContainer} */ spacing={6}>
                                <Grid item xs={12} lg={6}>
                                    <TailwindInput id="name" label="名稱" fullWidth required />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TailwindInput
                                        id="folder"
                                        label="儲存位置"
                                        fullWidth
                                        required
                                        endAdornment={<FolderAdornment />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FileInput
                                        id="video"
                                        label="EverCam 錄影"
                                        required
                                        image={VideoFiles}
                                        accept=".ecm"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
