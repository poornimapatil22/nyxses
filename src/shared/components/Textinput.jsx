import React from 'react'
import TextField from '@mui/material/TextField';

const Textinput = ({id, value,type, onChange, name, label, ...props }) => {
  return (
    <TextField
      size='medium'
      id={id}
      name={name}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      required
      autoComplete="off"
      {...props}
    />
  )
}

export default Textinput;