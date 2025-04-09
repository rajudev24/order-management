import { Skeleton } from "@mui/material";
import React from "react";

const ButtonSkeleton = ({ isCircle }) => {
  return (
    <>
      {isCircle ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Skeleton variant="text" height={60} width={100} />
      )}
    </>
  );
};

export default React.memo(ButtonSkeleton);
