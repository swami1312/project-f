import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { muiInputStyles } from "../../Utils/Utils";

const PasswordInput = ({
  id = "password",
  label = "Password",
  value = "",
  onChange,
  error = null,
  onKeyDown,
  inputRef,
  sx = {},
  inputProps = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  //   setMouseDown(true);
  //   setShowPassword(true);
  // };

  // const handleMouseUpPassword = () => {
  //   setMouseDown(false);
  //   setShowPassword(false);
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl sx={{ width: "100%", ...sx }} variant="outlined" size="small">
      <InputLabel htmlFor={id} style={{ color: "#9c9c9c" }}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        sx={{
          ...muiInputStyles,
          width: "100%",
        }}
        inputProps={{
          style: {
            color: "#9c9c9c",
            width: "100%",
          },
          ...inputProps,
        }}
        onChange={onChange}
        value={value}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              // onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? (
                <Icon icon="bi:eye-slash-fill" color="#9c9c9c" />
              ) : (
                <Icon icon="bi:eye-fill" color="#9c9c9c" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {error && (
        <p
          className="error"
          style={{ color: "red", margin: "4px 0 0 0", fontSize: "0.75rem" }}
        >
          {error}
        </p>
      )}
    </FormControl>
  );
};

export default PasswordInput;
