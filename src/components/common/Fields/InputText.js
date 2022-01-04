import { TextField } from '@mui/material';

const InputText = (props) => {
    const { errors, field, label, type, variant, rows, rowsMax , multiline, fullWidth} = props;
    const { name } = field;
    return <TextField
        {...field}
        type={type}
        error={errors[name]}
        label={label}
        fullWidth={fullWidth ?  false :  true}
        rows={rows}
        rowsmax={rowsMax}
        multiline={multiline}
        variant={variant}
        helperText={
            errors?.[name]?.message

        }
    />
}
export default InputText;