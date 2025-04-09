import React from "react";
import { ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDatatableButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  display: "flex",
  gap: "6px",
  alignItems: "center",
}));

const DatatableButtonGroup = ({ children, ...props }) => {
  return (
    <StyledDatatableButtonGroup
      variant="text"
      color="primary"
      aria-label="text primary button group"
      {...props}
    >
      {children}
    </StyledDatatableButtonGroup>
  );
};

export default React.memo(DatatableButtonGroup);
