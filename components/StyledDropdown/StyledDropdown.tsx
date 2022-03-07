import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import React from 'react';

import useStyles from './styles';

interface IStyledDropdown extends SelectProps {
  inputLabel: string;
  labelTxt: string;
  list: [
    {
      label: any
      value: any
    },
  ];
  disabled: boolean;
}

// StyledDropdown.defaultProps = {
//   labelTxt: '',
//   value: 'default',
// };

const StyledDropdown = ({
  labelTxt = '',
  list,
  value = 'default',
  onChange,
  inputLabel = "CKB",
  disabled,
  ...rest
}: IStyledDropdown) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      {inputLabel ? <InputLabel htmlFor="age-simple">{inputLabel}</InputLabel> : null}
      <Select
        value={value}
        onChange={onChange}
        name={labelTxt}
        className={classes.selectEmpty}
        variant="outlined"
        disabled={disabled}
        {...rest}
      >
        <MenuItem value="default" className={classes.defaultMenuItem}>
          {labelTxt || 'Select a value'}
        </MenuItem>
        {list &&
          list.map(item => (
            <MenuItem key={item.value} value={item.value} className={classes.menuItem}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
export default StyledDropdown;
