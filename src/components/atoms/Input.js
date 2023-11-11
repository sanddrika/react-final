import {TextField} from "@mui/material";

export const Input = ({
  type = "text",
  label,
  error,
  helperText,
  name,
  onChange,
  value,
  styles = {},
  ...rest
}) => {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
      helperText={helperText}
      sx={{
        width: 500,
        marginTop: 5,
        "& fieldset": {borderRadius: `20px`},
        ...styles,
      }}
      {...rest}
    />
  );
};
