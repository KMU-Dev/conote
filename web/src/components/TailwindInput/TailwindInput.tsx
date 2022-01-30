import { Box, FormHelperText, OutlinedInputProps } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';


export default function TailwindInput(props: TailwindInputProps) {
    const { id, required, label, fullWidth, error, sx, ...restProps } = props;

    return (
        <Box sx={sx}>
            <InputLabel
                htmlFor={id}
                color="primary"
                required={required}
                sx={{
                    color: 'text.primary',
                    fontSize: 'body2.fontSize',
                }}
            >
                {label}
            </InputLabel>
            <FormControl variant="outlined" size="small" fullWidth={fullWidth} error={typeof error !== 'undefined'}>
                <OutlinedInput {...restProps} label={undefined} sx={{ mt: 2 }} />
                {error && <FormHelperText sx={{ ml: 0 }}>{error}</FormHelperText>}
            </FormControl>
        </Box>
    );
}

export interface TailwindInputProps extends Omit<OutlinedInputProps, 'error'> {
    label: string;
    required?: boolean;
    fullwidth?: boolean;
    error?: string;
}
