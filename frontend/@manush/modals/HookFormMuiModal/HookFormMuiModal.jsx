import { forwardRef, useContext } from "react";
import { DialogActions, DialogContent } from "@mui/material";
import CustomMuiModal, { DialogTitle } from "../CustomMuiModal/CustomMuiModal";
import Box from "@mui/material/Box";
import CancelButton from "../../elements/button/CancelButton/CancelButton";
import { modalErrorContext } from "../../contexts/ModalErrorContextProvider.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const getErrorMessage = (error) => {
  return error?.message || "Something went wrong";
};

const HookFormMuiModal = forwardRef(
  ({ handleSubmit, children, actions, ...props }, ref) => {
    const contextData = useContext(modalErrorContext);

    const getRenderItems = () => {
      if (contextData?.status.hasError) {
        const error = contextData?.status?.error;
        return (
          <p
            style={{
              color: "red",
              fontSize: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getErrorMessage(error)}
          </p>
        );
      }
      if (contextData?.status?.isLoading) {
        return (
          <Box sx={{ height: "80px" }}>
            <Loader />
          </Box>
        );
      }
      return children;
    };

    return (
      <CustomMuiModal {...props}>
        <DialogTitle onClose={props.onClose}>{props.title}</DialogTitle>
        <form ref={ref} onSubmit={handleSubmit} autoComplete="off">
          <DialogContent dividers>{getRenderItems()}</DialogContent>
          {contextData?.status.hasError ? (
            <DialogActions>
              <CancelButton onClick={props.onClose} />
            </DialogActions>
          ) : (
            actions && <DialogActions>{actions}</DialogActions>
          )}
        </form>
      </CustomMuiModal>
    );
  },
);

export default HookFormMuiModal;
