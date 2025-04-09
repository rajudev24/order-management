import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DefaultButton from "../../elements/button/DefaultButton/DefaultButton.jsx";

const Body1 = ({ children, centered = false, sx = {}, ...props }) => (
  <Typography variant="body1" {...props}>
    {children}
  </Typography>
);

const ConfirmationDialog = ({
  open,
  onDeny,
  onConfirm,
  btnText,
  dialogContent,
  isResponseLoading,
  title,
  dialogTitle,
}) => {
  const content = dialogContent
    ? dialogContent
    : title
      ? title
      : dialogTitle
        ? dialogTitle
        : null;

  return (
    <Dialog
      open={open}
      onClose={onDeny}
      sx={{ borderRadius: "24px" }}
      scroll={"paper"}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onDeny}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: "30px", mb: "10px" }}>
        <DialogContentText sx={{ paddingX: "50px" }}>
          <Body1
            sx={{
              fontSize: "1.375rem",
              lineHeight: "30.8px",
              color: "primary.main",
            }}
          >
            {content ? content : "Are you sure?"}
          </Body1>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        disableSpacing
        sx={{ justifyContent: "center", mb: "20px" }}
      >
        <DefaultButton
          disabled={isResponseLoading}
          variant={"outlined"}
          color={"primary"}
          sx={{
            borderRadius: "38px",
            marginRight: "6px",
            width: "101px",
          }}
          onClick={onDeny}
        >
          {btnText ? "Cancel" : "No"}
        </DefaultButton>
        <DefaultButton
          disabled={isResponseLoading}
          onClick={onConfirm}
          color={"primary"}
          sx={{
            borderRadius: "38px",
            width: "105px",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {isResponseLoading && <CircularProgress size={15} color={"info"} />}
            {btnText ? btnText : "Yes"}
          </Stack>
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
