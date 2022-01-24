import { FormHelperText, OutlinedInputProps } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme =>
    createStyles({
        inputLabel: {
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
        },
        textField: {
            marginTop: theme.spacing(2),
        },
        error: {
            marginLeft: theme.spacing(0),
        }
    }),
);

export default function TailwindInput(props: TailwindInputProps) {
    const { id, required, label, fullWidth, error, className, ...restProps } = props;
    const classes = useStyles();

    return (
        <div className={className}>
            <InputLabel
                htmlFor={id}
                color="primary"
                required={required}
                className={classes.inputLabel}
            >
                {label}
            </InputLabel>
            <FormControl variant="outlined" size="small" fullWidth={fullWidth} error={typeof error !== 'undefined'}>
                <OutlinedInput {...restProps} className={classes.textField} label={undefined} />
                {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
            </FormControl>
        </div>
    );
}

export interface TailwindInputProps extends Omit<OutlinedInputProps, 'error'> {
    label: string;
    required?: boolean;
    fullwidth?: boolean;
    error?: string;
    className?: string;
}
