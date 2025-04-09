import { Tooltip } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import IconButton from "@mui/material/IconButton";

const DatatableEditButton = ({ onClick, startIcon, tooltipText }) => {
  return (
    <Tooltip title={tooltipText ? tooltipText : "Edit"}>
      <IconButton onClick={onClick}>
        {startIcon ? (
          startIcon
        ) : (
          <BorderColorOutlinedIcon style={{ fontSize: 20, color: "#7A5AF8" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};
export default DatatableEditButton;
