import { FormControl, FormControlLabel, styled, Switch } from "@mui/material";
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

const DetailsPublishView = ({ isLoading, value, label }) => {
  if (isLoading) {
    return <TextInputSkeleton />;
  }

  const isChecked = value === "1" || value === 1 || value === true;

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={<Android12Switch checked={isChecked} disabled />}
        label={label && label ? label : "Publish"}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontWeight: "700",
            fontSize: "14px",
          },
        }}
      />
    </FormControl>
  );
};

export default DetailsPublishView;
