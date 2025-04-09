import React, { useState } from "react";
import {
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import IButton from "../../button/IButton/IButton";
import { getErrorObject } from "../../../common/common.js";
import TextInputSkeleton from "../../skeleton/TextInputSkeleton/TextInputSkeleton.jsx";

const CustomPasswordInput = ({
  id,
  label,
  className,
  variant,
  size,
  isLoading,
  register,
  errorInstance,
  inputProps,
  InputProps,
  disabled,
  onInput: onChangeCallback,
  helperText,
  isLabelUp = false,
  IInfo,
  ...rest
}) => {
  const errorObj = getErrorObject(id, errorInstance);

  const [isViewPassword, setIsViewPassword] = useState(false);
  const handleShowPassword = () => setIsViewPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {isLabelUp && label && (
        <Box sx={{ display: "flex" }}>
          <FormLabel
            sx={{
              marginTop: "5px",
              fontWeight: "500",
              lineHeight: "1.37142857",
              color: "primary.main",
            }}
            error={typeof errorObj !== "undefined" ?? false}
            component="legend"
            required={true}
          >
            {label}
          </FormLabel>
          {IInfo && <IButton label={IInfo} isLoading={isLoading}></IButton>}
        </Box>
      )}

      <TextField
        fullWidth
        variant={variant ? variant : "outlined"}
        size={size ? size : "medium"}
        id={id}
        name={id}
        type={isViewPassword ? "text" : "password"}
        error={typeof errorObj !== "undefined" ?? false}
        className={className}
        label={!isLabelUp ? label : undefined}
        disabled={disabled ? disabled : false}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {isViewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{ ...inputProps, ...{ required: false } }}
        helperText={
          errorObj && errorObj.message
            ? errorObj.message.hasOwnProperty("key")
              ? errorObj.message?.values || {}
              : errorObj.message
            : ""
        }
        {...register(id)}
        {...rest}
      />
      {helperText && (
        <FormHelperText sx={{ color: "primary.main" }}>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomPasswordInput;
