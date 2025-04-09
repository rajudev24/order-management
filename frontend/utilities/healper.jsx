import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import DataTableToggleStatus from "../@manush/components/DataTable/Button/DatatableToggleStatus.jsx";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export const formatDate = (dateValue, format = "YYYY-MM-DD") => {
  if (!dateValue) {
    return "";
  }
  const myDate = new Date(dateValue);
  if (!dayjs(myDate).isValid()) {
    return "";
  }
  return dayjs(myDate).format(format);
};

export const formatDateAndTime = (dateValue, format = "YYYY-MM-DDTHH:mm") => {
  if (!dateValue) {
    return "";
  }
  const myDate = new Date(dateValue);
  if (!dayjs(myDate).isValid()) {
    return "";
  }
  return dayjs(myDate).format(format);
};

export function match(key, matchRules) {
  const result = matchRules[key] ?? matchRules["default"] ?? undefined;
  if (typeof result == "function") return result(key);
  return result;
}

export const rowStatusCell = (toggleAction) => {
  return (props) => {
    const data = props.row.original;
    return (
      <DataTableToggleStatus
        initialStatus={data?.row_status === "1"}
        onStatusChange={(newStatus) => toggleAction(data?.id, newStatus)}
      />
    );
  };
};
