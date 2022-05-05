import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import TutorialVideo from './tutorial_video.svg';

interface FileInputContentProps {
    title: string;
    subtitle: string;
    progress?: number;
}

export default function FileInputContent(props: FileInputContentProps) {
    const { title, subtitle, progress } = props;

    return (
        <>
            <Box component="img" src={TutorialVideo} alt="教學影片" width="220px" />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flexGrow={1}
                maxWidth={400}
                minHeight={116}
                px={{ xs: 2, sm: 12 }}
                mt={{ xs: 6, sm: 0 }}
            >
                <Box>
                    <Typography variant="h6" fontWeight="bold">{title}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {subtitle}
                    </Typography>
                </Box>
                {progress ? 
                    <Box>
                        {progress > 0 ?
                            <LinearProgress variant="determinate" value={progress} /> :
                            <LinearProgress />
                        }
                    </Box> :
                    ''
                }
            </Box>
        </>
    );
}
