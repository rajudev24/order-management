import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import TextInputSkeleton from "../../skeleton/TextInputSkeleton/TextInputSkeleton.jsx";
import {
  formatDate,
  formatDateAndTime,
  match,
} from "../../../../utilities/healper.jsx";
import { getErrorObject } from "../../../common/common.js";

const CustomDateTimePicker = ({
  id,
  label,
  className,
  variant = "outlined",
  isLoading,
  required,
  register,
  errorInstance,
  defaultValue,
  disabled,
  control,
  type = "datetime-local",
  ...rest
}) => {
  let errorObj = getErrorObject(id, errorInstance);

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      <Controller
        render={({ field: { value = "" } }) => (
          <TextField
            id={id}
            disabled={disabled}
            label={label}
            title={label}
            type={type}
            defaultValue={defaultValue}
            variant={variant}
            size={"medium"}
            className={className}
            error={errorObj && Boolean(errorObj)}
            InputLabelProps={{
              shrink: true,
              required: required || false,
            }}
            fullWidth
            {...register(id)}
            value={match(type, {
              date: formatDate(value),
              datetime: formatDateAndTime(value),
              "datetime-local": formatDateAndTime(value),
              default: value,
            })}
            {...rest}
          />
        )}
        name={id}
        control={control}
        defaultValue={""}
      />

      {errorObj && errorObj.message && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errorObj.message}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomDateTimePicker;
