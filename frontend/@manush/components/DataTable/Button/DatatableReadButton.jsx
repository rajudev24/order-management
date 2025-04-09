import { Tooltip } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const DatatableReadButton = ({ onClick, startIcon, tooltipText }) => {
  return (
    <Tooltip title={tooltipText ? tooltipText : "Read"}>
      <IconButton onClick={onClick}>
        {startIcon ? (
          startIcon
        ) : (
          <VisibilityOutlinedIcon style={{ fontSize: 24, color: "#7A5AF8" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};
export default DatatableReadButton;
