import { useCallback, useState } from "react";
import { Tooltip } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog.jsx";

const DatatableDeleteButton = ({
  deleteAction,
  startIcon,
  deleteTitle,
  tooltipText,
}) => {
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onConfirm = useCallback(async () => {
    try {
      setDeleteDialogOpen(true);
      setIsResponseLoading(true);
      await deleteAction();
      setDeleteDialogOpen(false);
    } finally {
      setIsResponseLoading(false);
    }
  }, [setDeleteDialogOpen, deleteAction, setIsResponseLoading]);

  const onDeny = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={tooltipText || "Delete"}>
        <IconButton onClick={() => setDeleteDialogOpen(true)}>
          {startIcon || (
            <DeleteOutlineOutlinedIcon
              style={{ fontSize: 24, color: "#7A5AF8" }}
            />
          )}
        </IconButton>
      </Tooltip>

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          isResponseLoading={isResponseLoading}
          open={isDeleteDialogOpen}
          onDeny={onDeny}
          onConfirm={onConfirm}
          title={deleteTitle}
          dialogTitle={"Are you sure?"}
        />
      )}
    </>
  );
};

export default DatatableDeleteButton;
