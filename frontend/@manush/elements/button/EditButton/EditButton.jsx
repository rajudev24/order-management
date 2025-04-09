import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ButtonSkeleton from "../../skeleton/ButtonSkeleton/ButtonSkeleton.jsx";

const EditButton = ({ onClick, isLoading, className, variant = "text" }) => {
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Tooltip title={"Edit"}>
      <Button
        startIcon={<BorderColorOutlinedIcon />}
        onClick={onClick}
        sx={{ padding: "10px 15px", backgroundColor: "#7a5af8" }}
        className={className ? className : className}
        variant={variant}
      >
        {"Edit"}
      </Button>
    </Tooltip>
  );
};

export default React.memo(EditButton);
