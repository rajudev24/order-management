import { useContext } from "react";
import { DialogActions, DialogContent } from "@mui/material";
import CustomMuiModal, { DialogTitle } from "../CustomMuiModal/CustomMuiModal";
import Box from "@mui/material/Box";
import Loader from "../../components/Loader/Loader.jsx";
import CancelButton from "../../elements/button/CancelButton/CancelButton";
import { modalErrorContext } from "../../contexts/ModalErrorContextProvider.jsx";

const getErrorMessage = (error) => {
  return error?.message || "Something went wrong";
};

const CustomDetailsViewMuiModalPopup = ({ children, actions, ...props }) => {
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
      {<DialogContent dividers>{getRenderItems()}</DialogContent>}
      {contextData?.status.hasError ? (
        <DialogActions>
          <CancelButton onClick={props.onClose} />
        </DialogActions>
      ) : (
        actions && <DialogActions>{actions}</DialogActions>
      )}
    </CustomMuiModal>
  );
};

export default CustomDetailsViewMuiModalPopup;
