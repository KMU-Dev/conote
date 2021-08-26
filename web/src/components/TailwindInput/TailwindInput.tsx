import { OutlinedInputProps } from '@material-ui/core';
import { createStyles, FormControl, InputLabel, makeStyles, OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
        inputLabel: {
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
        },
        textField: {
            marginTop: theme.spacing(2),
        }
    }),
);

export default function TailwindInput(props: TailwindInputProps) {
    const { id, required, label, fullWidth, className } = props;
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
            <FormControl variant="outlined" size="small" fullWidth={fullWidth}>
                <OutlinedInput {...props} className={classes.textField} label={undefined} />
            </FormControl>
        </div>
    );
}

interface TailwindInputProps extends OutlinedInputProps {
    label: string;
    required?: boolean;
    fullwidth?: boolean;
    className?: string;
}
