import { FormControl, FormControlLabel, styled, Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import TextInputSkeleton from "../../skeleton/TextInputSkeleton/TextInputSkeleton.jsx";

const Android12Switch = styled(Switch)(({ theme }) => ({
  width: 75,
  height: 34,
  padding: 0,
  marginRight: 6,
  marginLeft: 12,
  "& .MuiSwitch-switchBase": {
    top: "5px",
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(42px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        "&::after": {
          content: '"ON"',
          left: 8,
          right: "auto",
          color: "white",
        },
      },
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    border: 0,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    position: "relative",
    "&::after": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 32,
      display: "flex",
      justifyContent: "center",
      content: '"OFF"',
      right: 10,
      fontSize: "12px",
      color: "#626262",
      fontWeight: "bold",
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 24,
    height: 23,
    backgroundColor: "white",
  },
}));

function CustomPublishSwitchButton({
  id,
  isLoading,
  control,
  defaultValue = 0,
  onChange: onChangeCallback,
  label,
}) {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component="fieldset">
      <Controller
        render={({ field: { onChange, value } }) => {
          const isChecked = value === "1" || value === 1 || value === true;
          return (
            <FormControlLabel
              control={
                <>
                  <input name={id} value={value} style={{ display: "none" }} />
                  <Android12Switch
                    checked={isChecked}
                    onChange={(e) => {
                      const newValue = e.target.checked ? 1 : 0;
                      onChange(newValue);
                      if (
                        onChangeCallback &&
                        typeof onChangeCallback === "function"
                      ) {
                        onChangeCallback({
                          target: { value: newValue },
                        });
                      }
                    }}
                  />
                </>
              }
              label={label ? label : "Publish"}
            />
          );
        }}
        name={id}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

export default CustomPublishSwitchButton;
