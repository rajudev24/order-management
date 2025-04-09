import React from "react";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import ButtonSkeleton from "../../skeleton/ButtonSkeleton/ButtonSkeleton.jsx";

const UnstyledCancelButton = ({
  onClick,
  className,
  label,
  isLoading,
  startIcon,
  ...rest
}) => {
  const btnText = label || "Cancel";

  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={startIcon === false ? undefined : startIcon || <CancelIcon />}
      variant="outlined"
      onClick={onClick}
      className={className}
      {...rest}
      sx={{
        padding: "10px 15px",
      }}
    >
      {btnText}
    </Button>
  );
};

const CancelButton = styled(UnstyledCancelButton)(({ theme }) => ({
  background: theme.palette.grey[200],
  border: `1px solid ${theme.palette.grey[400]}`,
  color: theme.palette.grey[700],
  "&:hover": {
    border: `1px solid ${theme.palette.grey[400]}`,
    color: theme.palette.grey[800],
  },
}));

export default React.memo(CancelButton);
