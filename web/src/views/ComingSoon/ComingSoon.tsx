import { Box, Button, Typography } from "@mui/material";
import CountDownTimer from "../../components/CountDownTimer/CountDownTimer";
import SplitImageLayout from "../../components/SplitImageLayout/SplitImageLayout";
import UnderConstruction from './under_construction.svg';


export default function ComingSoon(props: ComingSoonProps) {
    const { time } = props;

    return (
        <SplitImageLayout image={UnderConstruction} alt="Coming soon">
            <Typography variant="h4" mb={3}>我們即將推出新功能</Typography>
            <Typography variant="subtitle1" color="text.secondary">
                我們的網站正在🚧施工🚧，
                <br />
                很快你就會看到令人驚嘆的新功能。
            </Typography>
            <Box width={1} my={4}>
                <CountDownTimer time={time} />
            </Box>
            <Button
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                sx={{ mt: 4 }}
            >
                推出時通知我
            </Button>
        </SplitImageLayout>
    );
}

interface ComingSoonProps {
    time: Date;
}
