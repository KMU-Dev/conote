import { useMutation } from '@apollo/client';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Button,
    ButtonTypeMap,
    Card,
    CardContent,
    Grid,
    Skeleton,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import AppLayout from '../../components/AppLayout/AppLayout';
import FileInput from '../../components/FileInput/FileInput';
import PageHeading from '../../components/PageHeading/PageHeading';
import TailwindInput from '../../components/TailwindInput/TailwindInput';
import { CREATE_VODCFS_SESSION } from '../../graphql/mutations/vodcfsSession';
import { GraphqlDto } from '../../graphql/type/type';
import { VodcfsSession } from '../../graphql/type/vodcfs-session';
import VideoFiles from './video_files.svg';


export default function VideoUpload() {
    const theme = useTheme();
    const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const [createVodcfsSession, { data: sessionData, loading: sessionLoading }] = useMutation<
        GraphqlDto<'createVodcfsSession', Pick<VodcfsSession, 'id' | 'captcha'>>
    >(CREATE_VODCFS_SESSION);

    useEffect(() => {
        createVodcfsSession();
    }, [createVodcfsSession]);

    const btnAdditionalProps = matchSmUp ? { size: 'large' } as Partial<ButtonTypeMap> : undefined;
    const captcha = sessionData?.createVodcfsSession.captcha;

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
            <Card sx={{ my: 6 }}>
                <CardContent
                    sx={{
                        px: 4,
                        py: 6,
                        ':last-child': {
                            pb: 8,
                        },
                    }}
                >
                    <Grid container justifyContent="space-between" spacing={6}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">影片資訊</Typography>
                            <Typography variant="body2" color="textSecondary" mt={1}>
                                這些資訊會公開顯示在網頁上，請注意填寫的內容。
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <TailwindInput id="name" label="名稱" fullWidth required />
                                </Grid>
                                {/* <Grid item xs={12} lg={6}>
                                    <TailwindInput
                                        id="folder"
                                        label="儲存位置"
                                        fullWidth
                                        required
                                        endAdornment={<FolderAdornment />}
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <FileInput
                                        id="video"
                                        label="EverCam 錄影"
                                        required
                                        image={VideoFiles}
                                        accept=".ecm"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={5} container spacing={2}>
                                    <Grid item xs={7} sm={9}>
                                        <TailwindInput
                                            id="captcha"
                                            label="驗證碼"
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={5} sm={3} alignSelf="flex-end">
                                    {sessionLoading ?
                                        // Use different height and negative margin to fix Skeleton bug
                                        <Skeleton width={128} height={60} sx={{ my: -2 }} /> :
                                        <Box
                                            component="img"
                                            src={captcha}
                                            alt="驗證碼"
                                            minHeight={36}
                                        />
                                    }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
