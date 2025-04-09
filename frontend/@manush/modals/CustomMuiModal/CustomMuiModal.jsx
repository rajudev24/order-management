import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Slide from "@mui/material/Slide";

const PREFIX = "CustomMuiModal";

const classes = {
  pageTitle: `${PREFIX}-pageTitle`,
  closeButton: `${PREFIX}-closeButton`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(3),
  height: "100vh",
  [`& .${classes.pageTitle}`]: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: "12px",
    },
  },
  [`& .${classes.closeButton}`]: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle {...other}>
      <Typography className={classes.pageTitle}>{children}</Typography>
      {onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomMuiModal = ({ onClose, children, maxWidth = "md", ...props }) => {
  return (
    <StyledDialog
      aria-labelledby="simple-modal-title"
      TransitionComponent={Transition}
      aria-describedby="simple-modal-description"
      {...props}
      title=""
      maxWidth={maxWidth}
      fullWidth
      scroll="paper"
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      {children}
    </StyledDialog>
  );
};

export default CustomMuiModal;
