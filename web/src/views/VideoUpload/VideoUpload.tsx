import { Button, ButtonTypeMap, useMediaQuery, useTheme } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppLayout from '../../components/AppLayout/AppLayout';
import PageHeading from '../../components/PageHeading/PageHeading';

export default function VideoUpload() {
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
        </AppLayout>
    );
}
