import { Person } from "@mui/icons-material";
import CancelButton from "../../../@manush/elements/button/CancelButton/CancelButton.jsx";
import SubmitButton from "../../../@manush/elements/button/SubmitButton/SubmitButton.jsx";
import HookFormMuiModal from "../../../@manush/modals/HookFormMuiModal/HookFormMuiModal.jsx";
import { Checkbox, Grid } from "@mui/material";
import useDataTableFetchData from "../../../@manush/hooks/useDataTableFetchData.js";
import { apiRoutes } from "../../../@manush/common/api-routes.js";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "../../../utilities/healper.jsx";
import DatatableButtonGroup from "../../../@manush/components/DataTable/Button/DatatableButtonGroup.jsx";
import DataTable from "../../../@manush/components/DataTable/DataTable.jsx";
import { useForm } from "react-hook-form";

export const ProductsListPopup = ({ onClose, setSelectedProducts }) => {
  const [checkedProducts, setCheckedProducts] = useState(new Set([]));

  const {
    onFetchData,
    data: products,
    loading,
    totalCount,
    refresh: mutateProduct,
  } = useDataTableFetchData({
    urlPath: apiRoutes.product.PRODUCT_CA,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({});

  const handleCheck = (e, product) => {
    const checked = e.target.checked;
    setCheckedProducts((prevChecked) => {
      const newChecked = new Set(prevChecked);
      if (checked) {
        newChecked.add(product);
      } else {
        newChecked.delete(product);
      }
      return newChecked;
    });
  };

  const columns = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "price",
        accessorKey: "price",
        header: "Price",
      },
      {
        id: "weight",
        accessorKey: "weight",
        header: "Weight",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created at",
        cell: (props) => {
          let data = props.row.original;
          return formatDate(data?.createdAt);
        },
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: "Updated at",
        cell: (props) => {
          let data = props.row.original;
          return formatDate(data?.updatedAt);
        },
      },
      {
        id: "action",
        header: "Select",
        cell: (props) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Checkbox
                checked={Array.from(checkedProducts).some(
                  (item) => item.id === data.id,
                )}
                onChange={(e) => handleCheck(e, data)}
              />
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [checkedProducts, products],
  );

  const handleSubmitProducts = () => {
    const selectedProductsArray = Array.from(checkedProducts);
    console.log("selectedProductsArray", selectedProductsArray);
    setSelectedProducts(selectedProductsArray);
    onClose();
  };

  return (
    <HookFormMuiModal
      open={true}
      onClose={onClose}
      title={
        <>
          <Person />
          {"Select Products"}
        </>
      }
      maxWidth={"lg"}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <SubmitButton isLoading={loading} onClick={handleSubmitProducts} />
        </>
      }
    >
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <DataTable
            columns={columns}
            tableData={products}
            fetchData={onFetchData}
            loading={loading}
            totalCount={totalCount}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
