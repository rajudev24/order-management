import HookFormMuiModal from "../../../@manush/modals/HookFormMuiModal/HookFormMuiModal.jsx";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import CancelButton from "../../../@manush/elements/button/CancelButton/CancelButton.jsx";
import SubmitButton from "../../../@manush/elements/button/SubmitButton/SubmitButton.jsx";
import { Grid } from "@mui/material";
import CustomTextInput from "../../../@manush/elements/Input/CustomTextInput/CustomTextInput.jsx";
import * as yup from "yup";
import Validator from "../../../utilities/Validator.js";
import CustomPublishSwitchButton from "../../../@manush/elements/Input/CustomPublishSwitchButton/index.jsx";
import {
  createProduct,
  updateProduct,
} from "../../../services/productsManagement/productService.js";
import { useFetchProduct } from "../../../services/productsManagement/hook.js";
import useNotiStack from "../../../@manush/hooks/useNotifyStack.js";
import CustomDateTimePicker from "../../../@manush/elements/Input/CustomDateTimePicker/CustomDateTimePicker.jsx";
import CustomFormSelect from "../../../@manush/elements/Input/CustomFormSelect/CustomFormSelect.jsx";

const initialValues = {
  name: "",
  description: "",
  price: null,
  weight: null,
  row_status: 1,
};

const discountOptions = [
  {
    id: 1,
    title: "Percentage",
  },
  {
    id: 2,
    title: "Fixed",
  },
  {
    id: 3,
    title: "Weighted",
  },
];

const PromotionAddEditPopup = ({ itemId, refreshDataTable, ...props }) => {
  const isEdit = itemId != null;
  const { data: product, loading } = useFetchProduct(itemId);
  const { successStack, errorStack } = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: Validator.string("Name"),
      description: Validator.string("Description"),
      price: Validator.number("Price"),
      weight: Validator.number("Weight"),
      row_status: Validator.row_status("Row Status"),
    });
  });
  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (product?.data) {
      reset({
        name: product?.data?.name,
        description: product?.data?.description,
        price: product?.data?.price,
        weight: product?.data?.weight,
        row_status: product?.data?.row_status,
      });
    } else {
      reset(initialValues);
    }
  }, [product?.data]);

  const handleSubmitProduct = async (data) => {
    try {
      if (itemId) {
        await updateProduct(itemId, data);
        successStack("Update promotion successfully", "success");
      } else {
        await createProduct(data);
        successStack("Promotion Added successfully", "success");
      }

      props.onClose();
      refreshDataTable();
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };

  const discount_type = watch("discount_type");
  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <Person />
          {isEdit ? "Promotion Edit" : "Add New Promotion"}
        </>
      }
      maxWidth={"lg"}
      handleSubmit={handleSubmit(handleSubmitProduct)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }
    >
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item md={6} sx={{ width: "100%" }}>
          <CustomTextInput
            required
            id="name"
            control={control}
            label={"Name"}
            errorInstance={errors}
            register={register}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "100%" }}>
          <CustomTextInput
            required
            id="description"
            control={control}
            label={"Description"}
            errorInstance={errors}
            register={register}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "100%" }}>
          <CustomFormSelect
            required
            id="discount_type"
            label={"Discount Type"}
            isLoading={loading}
            control={control}
            options={discountOptions}
            optionValueProp={"id"}
            optionTitleProp={["title"]}
            errorInstance={errors}
          />
        </Grid>
        {discount_type !== 3 && (
          <Grid item md={6} sx={{ width: "100%" }}>
            <CustomTextInput
              required
              id="discount_value"
              control={control}
              label={"Discount Value"}
              errorInstance={errors}
              register={register}
              isLoading={loading}
            />
          </Grid>
        )}

        {discount_type === 3 && (
          <>
            <Grid item md={6} sx={{ width: "48%" }}>
              <CustomTextInput
                required
                id="max_price"
                control={control}
                label={"Max Price"}
                errorInstance={errors}
                register={register}
                isLoading={loading}
              />
            </Grid>
            <Grid item md={6} sx={{ width: "48%" }}>
              <CustomTextInput
                required
                id="min_price"
                control={control}
                label={"Min Price"}
                errorInstance={errors}
                register={register}
                isLoading={loading}
              />
            </Grid>
            <Grid item md={6} sx={{ width: "100%" }}>
              <CustomTextInput
                required
                id="unit_value"
                control={control}
                label={"Per Unit Value"}
                errorInstance={errors}
                register={register}
                isLoading={loading}
              />
            </Grid>
          </>
        )}

        <Grid item md={6} sx={{ width: "48%" }}>
          <CustomDateTimePicker
            required
            id="start_date"
            control={control}
            label={"Start Date"}
            register={register}
            errorInstance={errors}
            isLoading={loading}
            type={"date"}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <CustomDateTimePicker
            required
            id="end_date"
            control={control}
            label={"End Date"}
            register={register}
            errorInstance={errors}
            isLoading={loading}
            type={"date"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomPublishSwitchButton
            id="row_status"
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={loading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default PromotionAddEditPopup;
