import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import SplitImageLayout from "../../components/SplitImageLayout/SplitImageLayout";
import routes from '../../constant/routes.json';
import PageNotFound from './page_not_found.svg';

export default function NotFound() {
    return (
        <SplitImageLayout image={PageNotFound} alt="Not found" classes={{ textGrid: { textAlign: { md: 'unset' } } }}>
            <Typography variant="h1" mb={3}>404</Typography>
            <Typography variant="h6" color="textSecondary">
                糟糕！看起來您點到壞掉的連結了，
                <br />
                如果您覺得相當不尋常，請告訴我們。
            </Typography>
            <Button
                variant="contained"
                size="large"
                color="primary"
                to={routes.HOME}
                component={Link}
                sx={{ mt: 8 }}
            >
                回到首頁
            </Button>
        </SplitImageLayout>
    );
}
