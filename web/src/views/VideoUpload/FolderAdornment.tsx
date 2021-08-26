import { IconButton, InputAdornment } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';

export default function FolderAdornment() {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="select drive location"
                edge="end"
            >
                <FolderIcon />
            </IconButton>
        </InputAdornment>
    )
}
