import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { debounce } from "../../utils/function";

interface ConnectionGridToolbarProps {
    numSelected?: number;
    onDeleteClick?: () => void;
    search?: string;
    onSearchChange?: (search: string) => void;
    debounceInterval?: number;
}

export default function ConnectionGridToolbar(props: ConnectionGridToolbarProps) {
    const { numSelected, onDeleteClick, search, onSearchChange, debounceInterval } = props;

    const [searchValue, setSearchValue] = useState(search ?? '');

    const debouncedOnSearchChange = useMemo(() => {
        if (debounceInterval) return debounce((search: string) => onSearchChange(search), debounceInterval);
        else return onSearchChange;
    }, [debounceInterval, onSearchChange]);

    const handleTextFieldChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value);

        if (onSearchChange) debouncedOnSearchChange(value);
    }, [onSearchChange, debouncedOnSearchChange]);

    const handleClearClick = useCallback(() => {
        setSearchValue('');
        if (onSearchChange) onSearchChange('');
    }, [onSearchChange]);

    return (
        <Toolbar
            sx={{
                justifyContent: 'space-between',
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Box>
                {numSelected > 0 && (
                    <Typography variant="subtitle1" color="inherit">已選取 {numSelected} 行</Typography>
                )}
            </Box>
            <Box>
                {numSelected > 0 ? (
                    <Tooltip title="刪除">
                        <IconButton onClick={onDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <TextField
                        variant="standard"
                        placeholder="搜尋"
                        value={searchValue}
                        sx={{ width: { xs: '25ch', md: '30ch' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearClick}>
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleTextFieldChange}
                    />
                )}
            </Box>
        </Toolbar>
    );
}
