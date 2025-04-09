import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import ButtonSkeleton from "../../skeleton/ButtonSkeleton/ButtonSkeleton.jsx";

const AddButton = ({
  onClick,
  url,
  className,
  tooltip,
  isLoading,
  text = "Add",
  ...props
}) => {
  const buttonComponent = (
    <Tooltip title={tooltip}>
      <Button
        variant="contained"
        onClick={onClick}
        className={className}
        startIcon={<AddIcon sx={{ mr: -0 }} />}
        {...props}
        sx={{
          backgroundColor: "#7a5af8",
          padding: "10px 15px",
        }}
      >
        {text}
      </Button>
    </Tooltip>
  );

  if (isLoading) {
    return <ButtonSkeleton isCircle={false} />;
  }

  if (url) {
    return <Link to={url}>{buttonComponent}</Link>;
  }

  return buttonComponent;
};

export default React.memo(AddButton);
