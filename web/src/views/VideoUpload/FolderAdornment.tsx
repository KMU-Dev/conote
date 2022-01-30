import { IconButton, InputAdornment } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';

export default function FolderAdornment() {
    return (
        <InputAdornment position="end">
            <IconButton aria-label="select drive location" edge="end" size="large">
                <FolderIcon />
            </IconButton>
        </InputAdornment>
    );
}
