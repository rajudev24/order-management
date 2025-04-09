import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import IButton from "../../button/IButton/IButton";
import Box from "@mui/material/Box";
import TextInputSkeleton from "../../skeleton/TextInputSkeleton/TextInputSkeleton.jsx";
import { getErrorObject } from "../../../common/common.js";

export const StyledTextField = styled(TextField)(() => ({
  [`& fieldset legend`]: {
    fontSize: "1rem",
  },
}));

const CustomTextInput = ({
  id,
  formId,
  label,
  className,
  variant,
  size,
  isLoading,
  control,
  errorInstance,
  multiline,
  rows,
  type,
  defaultValue,
  InputProps,
  disabled,
  readOnly,
  onInput: onChangeCallback,
  helperText,
  fullWidth = true,
  placeholder,
  required,
  formLabelPadding = "10px",
  formLabelColor = "primary.main",
  handleBlur,
  IInfo,
}) => {
  let errorObj = getErrorObject(id, errorInstance);

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      <FormControl fullWidth={fullWidth}>
        <Controller
          render={({ field: { ref, onChange, value = defaultValue } }) => (
            <>
              {label && (
                <Box sx={{ display: "flex" }}>
                  <FormLabel
                    sx={{
                      paddingBottom: formLabelPadding,
                      color: formLabelColor,
                      fontWeight: "500",
                    }}
                    error={typeof errorObj != "undefined"}
                    component="legend"
                    required={required}
                  >
                    {label}
                  </FormLabel>
                  {IInfo && (
                    <IButton label={IInfo} isLoading={isLoading}></IButton>
                  )}
                </Box>
              )}

              <StyledTextField
                name={formId ?? id}
                fullWidth
                ref={ref}
                variant={variant ? variant : "outlined"}
                size={size ? size : "medium"}
                className={className}
                title={label}
                placeholder={placeholder}
                multiline={multiline}
                rows={rows}
                type={type}
                error={errorObj && Boolean(errorObj)}
                helperText={
                  errorObj && errorObj.message
                    ? errorObj.message.hasOwnProperty("key")
                      ? errorObj.message?.values || {}
                      : errorObj.message
                    : ""
                }
                onInput={(event) => {
                  let value =
                    type == "file" ? event.target.files : event.target.value;
                  if (onChangeCallback) {
                    onChangeCallback(value);
                  }
                }}
                onChange={(event) => {
                  let value =
                    type == "file" ? event.target.files : event.target.value;
                  onChange(value);
                }}
                onBlur={handleBlur}
                value={value ?? ""}
                disabled={disabled ? disabled : false}
                InputProps={{
                  ...InputProps,
                  required: false,
                  readOnly: readOnly,
                }}
              />
            </>
          )}
          name={id}
          control={control}
          defaultValue={defaultValue ?? ""}
        />
      </FormControl>

      {helperText && (
        <FormHelperText sx={{ color: "primary.main" }}>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomTextInput;
