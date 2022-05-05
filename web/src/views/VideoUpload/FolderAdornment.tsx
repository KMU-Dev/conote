import FolderIcon from '@mui/icons-material/Folder';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export default function FolderAdornment() {
    return (
        <InputAdornment position="end">
            <IconButton aria-label="select drive location" edge="end" size="large">
                <FolderIcon />
            </IconButton>
        </InputAdornment>
    );
}
