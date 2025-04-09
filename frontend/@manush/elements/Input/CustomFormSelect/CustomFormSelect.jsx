import { Controller } from "react-hook-form";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import IButton from "../../button/IButton/IButton";
import TextInputSkeleton from "../../skeleton/TextInputSkeleton/TextInputSkeleton.jsx";

const CustomFormSelect = ({
  id,
  isLoading,
  control,
  label,
  errorInstance,
  variant = "outlined",
  options = [],
  defaultValue,
  optionValueProp,
  optionTitleProp,
  maxHeight = 400,
  multiple = false,
  onChange: onChangeCallback,
  inputProps,
  isDisabled = false,
  required = false,
  isGroupData = false,
  optionGroupTitleProp,
  groupDataKey,
  isDynamicField = false,
  showSelcetAsOption = true,
  IInfo,
}) => {
  const getTitle = (option, optionTitleProp) => {
    let title = "";
    if (option && optionTitleProp) {
      let arr = [];
      for (let i = 0; i < optionTitleProp.length; i++) {
        arr.push(option[optionTitleProp[i]]);
      }
      title = arr.join("-").split("").join("");
      title = title[0] === "-" ? title.slice(1) : title;
    }
    return title;
  };

  let errorObj = errorInstance?.[id];
  const matches = isDynamicField && id.split(".");
  if (matches) {
    errorObj =
      errorInstance?.[matches[0]] &&
      errorInstance?.[matches[0]][matches[1]]?.[matches[2]];
  }

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl
      variant={variant}
      fullWidth={true}
      disabled={isDisabled}
      error={!!errorObj}
      size={"medium"}
    >
      <Box>
        <InputLabel id="select-outlined-label" required={required}>
          {label}
        </InputLabel>
        {IInfo && <IButton label={IInfo} isLoading={isLoading} />}
      </Box>

      <Controller
        render={({ field: { onChange, value = defaultValue } }) => (
          <>
            <Select
              MenuProps={{
                style: {
                  maxHeight: maxHeight,
                },
              }}
              labelId="select-outlined-label"
              aria-label={id}
              label={label}
              value={value ? value : multiple ? [] : ""}
              multiple={multiple}
              name={id}
              onChange={(e) => {
                onChange(e.target.value);
                if (
                  onChangeCallback &&
                  typeof onChangeCallback === "function"
                ) {
                  onChangeCallback(e.target.value);
                }
              }}
              inputProps={inputProps}
            >
              {showSelcetAsOption && (
                <MenuItem disabled={multiple} value="">
                  Select
                </MenuItem>
              )}
              {options.map((option, index) => {
                if (!isGroupData) {
                  let value =
                    option[optionValueProp] && option[optionValueProp];
                  let title = getTitle(option, optionTitleProp);

                  return (
                    <MenuItem key={index} value={value}>
                      {option?.icon}
                      {title}
                    </MenuItem>
                  );
                } else {
                  return (
                    (groupDataKey &&
                      optionGroupTitleProp &&
                      option[groupDataKey]) ||
                    []
                  ).map((item, idx) => {
                    let value = item[optionValueProp] && item[optionValueProp];
                    let title = getTitle(item, optionGroupTitleProp);
                    return (
                      <MenuItem
                        key={idx}
                        value={value}
                        sx={{ textIndent: "20px" }}
                      >
                        {title}
                      </MenuItem>
                    );
                  });
                }
              })}
            </Select>
            {errorObj && (
              <FormHelperText>{errorObj.message || ""}</FormHelperText>
            )}
          </>
        )}
        name={id}
        control={control}
      />
    </FormControl>
  );
};

export default CustomFormSelect;
