import { useMutation } from '@apollo/client';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AppLayout from '../../components/AppLayout/AppLayout';
import FileInput from '../../components/FileInput/FileInput';
import { useNotification } from '../../components/Notification';
import PageHeading from '../../components/PageHeading/PageHeading';
import { TailwindController } from '../../components/TailwindInput';
import { UPLOAD_VIDEO } from '../../graphql/mutations/video';
import { AUTHENTICATE_VODCFS_SESSION, CREATE_VODCFS_SESSION } from '../../graphql/mutations/vodcfsSession';
import { GraphqlDto } from '../../graphql/type/type';
import { Video } from '../../graphql/type/video';
import { VodcfsSession, VodcfsSessionErrorReason, VodcfsSessionStatus } from '../../graphql/type/vodcfs-session';
import { humanFileSize } from '../../utils/file';
import FileInputContent from './FileInputContent';
import { UploadVideoForm } from './UploadVideoForm';
import VideoFiles from './video_files.svg';


export default function VideoUpload() {
    const [videoError, setVideoError] = useState('');
    const [uploadProgress, setUploadProgress] = useState<number>(undefined);

    const theme = useTheme();
    const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const { enqueueNotification, enqueueCommonErrorNotification } = useNotification();
    const { control, register, reset, watch, handleSubmit, formState: { errors } } = useForm<UploadVideoForm>({
        mode: 'onTouched',
        defaultValues: { title: '', captchaAnswer: '' },
        resolver: classValidatorResolver(UploadVideoForm),
    });

    const [createVodcfsSession, { data: sessionData, loading: sessionLoading }] = useMutation<
        GraphqlDto<'createVodcfsSession', Pick<VodcfsSession, 'id' | 'captcha'>>
    >(CREATE_VODCFS_SESSION);
    const [authenticateVodcfsSession] = useMutation<
        GraphqlDto<'authenticateVodcfsSession', Pick<VodcfsSession, 'id' | 'status' | 'errorReason'>>
    >(AUTHENTICATE_VODCFS_SESSION);
    const [uploadVideo] = useMutation<GraphqlDto<'uploadVideo', Pick<Video, 'id' | 'vodcfsVideo'>>>(UPLOAD_VIDEO);

    useEffect(() => {
        createVodcfsSession();
    }, [createVodcfsSession]);

    const btnAdditionalProps = matchSmUp ? { size: 'large' } as Partial<ButtonTypeMap> : undefined;
    const captcha = sessionData?.createVodcfsSession.captcha;
    const video = watch('video');

    const videoContent = useMemo(() => {
        if (video && video.length > 0) {
            const file = video[0];
            const progress = uploadProgress && Math.round(uploadProgress / file.size * 10000) / 100;
            const displayedProgress = Math.round(progress);
            const fileSize = humanFileSize(file.size, true);

            let subtitle;
            if (uploadProgress === -1) subtitle = '準備中…';
            else if (uploadProgress === -2) subtitle = '影片處理中，請稍後…';
            else if (uploadProgress > 0) subtitle = `${displayedProgress}% (${humanFileSize(uploadProgress, true)} / ${fileSize})`;
            else subtitle = fileSize;

            return (
                <FileInputContent
                    title={file.name}
                    subtitle={subtitle}
                    progress={progress}
                />
            );
        }
        return '';
    }, [video, uploadProgress]);

    const handleProgress = (e: ProgressEvent) => {
        if (e.loaded === e.total) setUploadProgress(-2);
        else setUploadProgress(e.loaded);
    };

    const onSubmit = useCallback<SubmitHandler<UploadVideoForm>>(async (data) => {
        if (!sessionData?.createVodcfsSession) return;

        // validate video input
        if (!data.video || data.video.length === 0) {
            setVideoError('請選擇 EverCam 錄影檔');
            return;
        }
        else setVideoError('');

        try {
            // authenticate vodcfs session
            setUploadProgress(-1);

            const response = await authenticateVodcfsSession({
                variables: {
                    input: { id: sessionData.createVodcfsSession.id, captchaAnswer: data.captchaAnswer },
                },
            });
            const session = response.data?.authenticateVodcfsSession;

            // handling error
            if (session.status !== VodcfsSessionStatus.AUTHENTICATED) {
                let content: string;
                if (session.errorReason === VodcfsSessionErrorReason.INVALID_CAPTCHA) content = '驗證碼錯誤';
                else content = '未知錯誤，請聯絡系統管理員。';

                enqueueNotification({
                    title: '無法上傳影片',
                    content,
                    variant: 'error',
                });

                createVodcfsSession();
                setUploadProgress(undefined);

                return;
            }

            // upload video
            const uploadResponse = await uploadVideo({
                variables: {
                    vodcfsInput: { title: data.title, file: data.video[0], sessionId: session.id },
                },
                context: { fetchOptions: { onUploadProgress: handleProgress } },
            });
            if (uploadResponse.data?.uploadVideo.vodcfsVideo?.id) {
                enqueueNotification({
                    title: '成功上傳影片',
                    content: '影片上傳後仍須轉檔，請至高醫數理雲確認進度。',
                    variant: 'success',
                });
                reset();
            } else {
                enqueueNotification({
                    title: '無法上傳影片',
                    content: '未知錯誤，請聯絡系統管理員。',
                    variant: 'error',
                });
            }
        } catch (e) {
            enqueueCommonErrorNotification(e);
        } finally {
            createVodcfsSession();
            setUploadProgress(undefined);
        }
    }, [authenticateVodcfsSession, createVodcfsSession, enqueueCommonErrorNotification, enqueueNotification, reset, sessionData?.createVodcfsSession, uploadVideo]);

    return (
        <AppLayout>
            <PageHeading title="上傳影片" breadcrumb="videos.upload">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleSubmit(onSubmit)}
                    disabled={uploadProgress !== undefined}
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
                                    <TailwindController
                                        name="title"
                                        control={control}
                                        label="標題"
                                        fullWidth
                                        required
                                        disabled={uploadProgress !== undefined}
                                        errors={errors}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FileInput
                                        id="video"
                                        label="EverCam 錄影"
                                        required
                                        image={VideoFiles}
                                        accept=".ecm"
                                        error={videoError}
                                        customContent={videoContent}
                                        register={register('video')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={5} container spacing={2}>
                                    <Grid item xs={7} sm={9}>
                                        <TailwindController
                                            name="captchaAnswer"
                                            control={control}
                                            label="驗證碼"
                                            required
                                            fullWidth
                                            disabled={uploadProgress !== undefined}
                                            errors={errors}
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
                                            mb={errors.captchaAnswer && 6}
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
