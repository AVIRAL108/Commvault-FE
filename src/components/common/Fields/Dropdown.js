import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import _ from 'lodash';

const Dropdown = (props) => {
    const { errors, field, label, variant, options } = props;
    const { name } = field;
    return (
        <FormControl                
        fullWidth variant={variant}
            sx={{  minWidth: 120 }} error={errors?.[name] ? true  :  false}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                 {...field}
                labelId={name}
                label={label}
                fullWidth
            >

                {
                    _.map(options, (option) => {
                        return <MenuItem key={option.id} value={option.value}>{option.text}</MenuItem>

                    })
                }
            </Select>
            <FormHelperText>{errors?.[name]?.message}</FormHelperText>

        </FormControl>
    )
}
export default Dropdown;