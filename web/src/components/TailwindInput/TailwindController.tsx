import { Controller, ControllerProps, DeepMap, FieldError, FieldPath, FieldValues } from 'react-hook-form';
import TailwindInput, { TailwindInputProps } from './TailwindInput';

export default function TailwindController<
    TField extends FieldValues,
    TName extends FieldPath<TField>
>(props: TailwindControllerProps<TField, TName>) {
    const { errors, name, rules, shouldUnregister, defaultValue, control, ...restProps } = props;

    return (
        <Controller
            name={name}
            control={control}
            shouldUnregister={shouldUnregister}
            defaultValue={defaultValue}
            render={({ field: { ref, ...fields }}) =>
                <TailwindInput
                    error={errors[name] && (errors[name] as FieldError).message}
                    {...restProps}
                    {...fields}
                    inputRef={ref}
                />
            }
        />
    );
}

interface TailwindControllerProps<
    TField extends FieldValues,
    TName extends FieldPath<TField>
> extends Omit<TailwindInputProps, 'defaultValue' | 'name'>, Omit<ControllerProps<TField, TName>, 'render'> {
    errors?: DeepMap<TField, FieldError>;
}
