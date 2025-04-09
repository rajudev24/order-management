import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import NoSsr from "@mui/material/NoSsr";
import { Container } from "@mui/material";

const Loader = ({ backgroundColor }) => {
  return (
    <NoSsr>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: backgroundColor || "",
        }}
      >
        <CircularProgress />
      </Container>
    </NoSsr>
  );
};

export default Loader;
