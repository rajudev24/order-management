import React from "react";

import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import ButtonSkeleton from "../../skeleton/ButtonSkeleton/ButtonSkeleton.jsx";

const IButton = ({ label, isLoading }) => {
  return isLoading ? (
    <ButtonSkeleton isCircle={true} />
  ) : (
    <Tooltip
      title={label}
      placement="right-end"
      arrow
      enterDelay={300}
      sx={{
        width: "7px",
        height: "7px",
        marginLeft: "10px",
        marginTop: "5px",
      }}
    >
      <IconButton color="primary">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(IButton);
