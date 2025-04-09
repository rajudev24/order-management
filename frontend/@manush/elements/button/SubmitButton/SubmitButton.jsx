import React from "react";
import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonSkeleton from "../../skeleton/ButtonSkeleton/ButtonSkeleton.jsx";

const SubmitButton = ({
  onClick,
  className,
  label,
  isSubmitting,
  isLoading,
  isDisable,
  startIcon,
  ...rest
}) => {
  const btnText = label ? label : "Done";
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={startIcon === false ? undefined : startIcon || <Save />}
      variant="contained"
      color="primary"
      onClick={onClick}
      className={className}
      type="submit"
      disabled={isSubmitting}
      {...rest}
      sx={{
        backgroundColor: "#7a5af8",
        padding: "10px 15px",
      }}
    >
      {isSubmitting && (
        <CircularProgress
          size={20}
          sx={{
            color: "#FFFFFF",
            height: "20px !important",
            width: "20px",
            marginRight: 1,
            "& > *": {
              height: "20px !important",
              width: "20px",
            },
          }}
        />
      )}
      {btnText}
    </Button>
  );
};

export default React.memo(SubmitButton);
