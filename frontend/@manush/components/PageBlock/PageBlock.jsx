import React from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";

const StyledCard = styled(Card)(() => ({
  marginTop: "0px",
  marginRight: "0px",
  borderRadius: 0,
  background: "transparent",
  ".MuiCardContent-root": {
    padding: "20px",
    margin: 0,
  },
}));

const StyledCardHeader = styled(CardHeader)(() => ({
  margin: 0,
  padding: "5px 10px",
  background: "#fff",
  "& .MuiCardHeader-content .MuiCardHeader-title": {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.25rem",
    color: "#505050",
  },
  "& .MuiCardHeader-action": {
    alignSelf: "center",
    margin: 0,
    padding: 0,
  },
}));

const PageBlock = ({ children, title, extra, sx, headerSx }) => {
  return (
    <StyledCard elevation={0} sx={sx}>
      {(!!title || !!extra) && (
        <StyledCardHeader
          sx={headerSx}
          title={title}
          action={
            extra && (
              <Stack
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {extra}
              </Stack>
            )
          }
        />
      )}
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default React.memo(PageBlock);
