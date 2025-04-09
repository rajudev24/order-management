import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import React from "react";
import TextInputSkeleton from "../../skeleton/TextInputSkeleton/TextInputSkeleton.jsx";

const PREFIX = "DetailsInputView";

const classes = {
  inputView: `${PREFIX}-inputView`,
  label: `${PREFIX}-label`,
};

const StyledGrid = styled(Grid)(() => {
  return {
    [`& .${classes.inputView}`]: {
      fontWeight: "bold",
      fontSize: 14,
      width: "100%",
      minHeight: "40px",
      padding: "8px",
      lineHeight: 1.5,
      boxShadow: "0px 0px 3px #ddd",
      borderRadius: "0.25rem",
      marginTop: "8px",
      wordBreak: "break-all",
      border: "1px solid #b5b5b5",
    },

    [`& .${classes.label}`]: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: "5px",
      color: "#7E5FF8",
    },
  };
});

const DetailsInputView = ({ label, value, isLoading, html }) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <StyledGrid item xs={12}>
      <FormLabel className={classes.label}>{label}</FormLabel>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className={classes.inputView}>{value}</div>
      )}
    </StyledGrid>
  );
};

export default React.memo(DetailsInputView);
