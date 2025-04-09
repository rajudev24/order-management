import HookFormMuiModal from "../../../@manush/modals/HookFormMuiModal/HookFormMuiModal.jsx";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
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

const initialValues = {
  name: "",
  description: "",
  price: null,
  weight: null,
  row_status: 1,
};

const OrderAddEditPopup = ({ itemId, refreshDataTable, ...props }) => {
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
        successStack("Update order successfully", "success");
      } else {
        await createProduct(data);
        successStack("Order Added successfully", "success");
      }

      props.onClose();
      refreshDataTable();
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };
  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <Person />
          {isEdit ? "Order Edit" : "Add New Order"}
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
      <Grid container spacing={5} sx={{ width: "100%" }}>
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
        <Grid item md={6} sx={{ width: "48%" }}>
          <CustomTextInput
            required
            id="price"
            control={control}
            label={"Price"}
            errorInstance={errors}
            register={register}
            isLoading={loading}
          />
        </Grid>
        <Grid item md={6} sx={{ width: "48%" }}>
          <CustomTextInput
            required
            id="weight"
            control={control}
            label={"Weight(g)"}
            errorInstance={errors}
            register={register}
            isLoading={loading}
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

export default OrderAddEditPopup;
