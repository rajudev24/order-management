import CustomDetailsViewMuiModalPopup from "../../../@manush/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModalPopup.jsx";
import { Grid } from "@mui/material";
import { Person } from "@mui/icons-material";
import CancelButton from "../../../@manush/elements/button/CancelButton/CancelButton.jsx";
import { useFetchProduct } from "../../../services/productsManagement/hook.js";
import EditButton from "../../../@manush/elements/button/EditButton/EditButton.jsx";
import DetailsInputView from "../../../@manush/elements/display/DetailsInputView/DetailsInputView.jsx";
import DetailsPublishView from "../../../@manush/elements/display/DetailsPublishView/DetailsPublishView.jsx";

const ProductDetailsPopup = ({ itemId, openEditModal, ...props }) => {
  const { data: product, loading } = useFetchProduct(itemId);
  return (
    <CustomDetailsViewMuiModalPopup
      open={true}
      {...props}
      title={
        <>
          <Person />
          {"View Product"}
        </>
      }
      maxWidth={"lg"}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={loading} />
          {product?.data && (
            <EditButton
              variant="contained"
              onClick={() => openEditModal(product?.data.id)}
              isLoading={loading}
            />
          )}
        </>
      }
    >
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item md={6} sx={{ width: "100%" }}>
          <DetailsInputView
            label={"Name"}
            value={product?.data?.name}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "100%" }}>
          <DetailsInputView
            label={"Description"}
            value={product?.data?.description}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsInputView
            label={"Price"}
            value={product?.data?.price}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsInputView
            label={"Weight"}
            value={product?.data?.weight}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsPublishView
            value={product?.data?.row_status}
            isLoading={loading}
          />
        </Grid>
      </Grid>
    </CustomDetailsViewMuiModalPopup>
  );
};

export default ProductDetailsPopup;
