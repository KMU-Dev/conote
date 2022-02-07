import { IconButton, InputAdornment, TextField, Toolbar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { debounce } from "../../utils/function";

interface QuickSerarchToolbarProps {
    search?: string;
    onSearchChange?: (search: string) => void;
    debounceInterval?: number;
}

export default function QuickSearchToolbar(props: QuickSerarchToolbarProps) {
    const { search, onSearchChange, debounceInterval } = props;

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
        <Toolbar sx={{ justifyContent: 'end' }}>
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
        </Toolbar>
    );
}
