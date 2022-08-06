/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, label, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            label,
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix={label || ""}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs({ value,disabled, label,onChange }) {
  // const [values, setValues] = React.useState({
  //   value: value,
  // });
  // useEffect(()=>{
  //   setValues({
  //     value: value,
  //   })
  // },[label,value])
  // useEffect(()=>{
  //   onChange(values.value);
  // },[values])

  const handleChange = (event) => {
    // setValues({
    //   ...values,
    //   value: event.target.value,
    // });
    onChange(event.target.value);
  };
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        name="numberformat"
        disabled={disabled}
        InputProps={{
          label,
          inputComponent: NumberFormatCustom,
        }}
        variant="outlined"
      />
    </Box>
  );
}
