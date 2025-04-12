import CustomDetailsViewMuiModalPopup from "../../../@manush/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModalPopup.jsx";
import { Grid } from "@mui/material";
import { Person } from "@mui/icons-material";
import CancelButton from "../../../@manush/elements/button/CancelButton/CancelButton.jsx";
import EditButton from "../../../@manush/elements/button/EditButton/EditButton.jsx";
import DetailsInputView from "../../../@manush/elements/display/DetailsInputView/DetailsInputView.jsx";
import DetailsPublishView from "../../../@manush/elements/display/DetailsPublishView/DetailsPublishView.jsx";
import { useFetchPromotion } from "../../../services/promotionManagement/hook.js";

const PromotionDetailsPopup = ({ itemId, openEditModal, ...props }) => {
  const { data: promotion, loading } = useFetchPromotion(itemId);
  return (
    <CustomDetailsViewMuiModalPopup
      open={true}
      {...props}
      title={
        <>
          <Person />
          {"View Promotion"}
        </>
      }
      maxWidth={"lg"}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={loading} />
          {promotion?.data && (
            <EditButton
              variant="contained"
              onClick={() => openEditModal(promotion?.data.id)}
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
            value={promotion?.data?.title}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "100%" }}>
          <DetailsInputView
            label={"Description"}
            value={promotion?.data?.description}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsInputView
            label={"Discount Type"}
            value={promotion?.data?.discount_type}
            isLoading={loading}
          />
        </Grid>
        {promotion?.data?.discount_type === ("PERCENTAGE" || "FIXED") && (
          <Grid item md={6} sx={{ width: "48%" }}>
            <DetailsInputView
              label={"Discount Value"}
              value={promotion?.data?.discount_value}
              isLoading={loading}
            />
          </Grid>
        )}
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsInputView
            label={"Max Weight"}
            value={promotion?.data?.max_weight}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsInputView
            label={"Min Weight"}
            value={promotion?.data?.min_weight}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <DetailsInputView
            label={"Unit Price"}
            value={promotion?.data?.unit_price}
            isLoading={loading}
          />
        </Grid>
        {promotion?.data?.products &&
          promotion?.data?.products?.map((products) => (
            <Grid item md={6} sx={{ width: "48%" }}>
              <DetailsInputView
                label={"Selected Product"}
                value={products?.name}
                isLoading={loading}
              />
            </Grid>
          ))}

        <Grid item md={6} sx={{ width: "100%" }}>
          <DetailsPublishView
            value={promotion?.data?.row_status}
            isLoading={loading}
          />
        </Grid>
      </Grid>
    </CustomDetailsViewMuiModalPopup>
  );
};

export default PromotionDetailsPopup;
