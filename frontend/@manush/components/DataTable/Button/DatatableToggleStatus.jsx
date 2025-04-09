import { useState, useCallback } from "react";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog.jsx";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: "#7a5af8",
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
    backgroundColor: "#7a5af8",
  },
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#7a5af8",
    opacity: 1,
  },
  "& .Mui-checked .MuiSwitch-thumb": {
    backgroundColor: "#ffffff",
  },
  "&.Mui-disabled .MuiSwitch-track": {
    backgroundColor: "#a3a1a1",
    opacity: 0.5,
  },
  "&.Mui-disabled .MuiSwitch-thumb": {
    backgroundColor: "#a7a7a7",
  },
}));

const DataTableToggleStatus = ({
  initialStatus,
  onStatusChange,
  tooltipText,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [localStatus, setLocalStatus] = useState(initialStatus);
  const [pendingStatus, setPendingStatus] = useState(initialStatus);

  const handleToggle = useCallback(() => {
    setPendingStatus(!localStatus);
    setShowConfirmDialog(true);
  }, [localStatus]);

  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      await onStatusChange(pendingStatus);
      setLocalStatus(pendingStatus);
    } catch (error) {
      setPendingStatus(localStatus);
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  }, [pendingStatus, localStatus, onStatusChange]);

  const handleCancel = useCallback(() => {
    setPendingStatus(localStatus);
    setShowConfirmDialog(false);
  }, [localStatus]);

  return (
    <>
      <Tooltip title={tooltipText ? tooltipText : "Update"}>
        <Android12Switch
          checked={localStatus}
          onChange={handleToggle}
          disabled={disabled}
        />
      </Tooltip>

      <ConfirmationDialog
        open={showConfirmDialog}
        onDeny={handleCancel}
        onConfirm={handleConfirm}
        isResponseLoading={isLoading}
        dialogTitle={"Are you sure?"}
        title={pendingStatus ? "enable" : "disable"}
      />
    </>
  );
};

export default DataTableToggleStatus;
