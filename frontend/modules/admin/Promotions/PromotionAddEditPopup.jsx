import HookFormMuiModal from "../../../@manush/modals/HookFormMuiModal/HookFormMuiModal.jsx";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import CancelButton from "../../../@manush/elements/button/CancelButton/CancelButton.jsx";
import SubmitButton from "../../../@manush/elements/button/SubmitButton/SubmitButton.jsx";
import { Button, Chip, Grid, Typography } from "@mui/material";
import CustomTextInput from "../../../@manush/elements/Input/CustomTextInput/CustomTextInput.jsx";
import * as yup from "yup";
import Validator from "../../../utilities/Validator.js";
import CustomPublishSwitchButton from "../../../@manush/elements/Input/CustomPublishSwitchButton/index.jsx";
import useNotiStack from "../../../@manush/hooks/useNotifyStack.js";
import CustomDateTimePicker from "../../../@manush/elements/Input/CustomDateTimePicker/CustomDateTimePicker.jsx";
import CustomFormSelect from "../../../@manush/elements/Input/CustomFormSelect/CustomFormSelect.jsx";
import { ProductsListPopup } from "./ProductsListPopup.jsx";
import {
  createPromotion,
  updatePromotion,
} from "../../../services/promotionManagement/promotionService.js";
import { useFetchPromotion } from "../../../services/promotionManagement/hook.js";

const initialValues = {
  title: "",
  description: null,
  discount_type: "",
  discount_value: null,
  max_weight: null,
  min_weight: null,
  unit_price: null,
  start_date: Date(),
  end_date: "",
  row_status: 1,
  products: [],
};

const discountOptions = [
  {
    id: "PERCENTAGE",
    title: "Percentage",
  },
  {
    id: "FIXED",
    title: "Fixed",
  },
  {
    id: "WEIGHTED",
    title: "Weighted",
  },
];

const PromotionAddEditPopup = ({ itemId, refreshDataTable, ...props }) => {
  const isEdit = itemId != null;
  const { data: promotion, loading } = useFetchPromotion(itemId);
  const { successStack, errorStack } = useNotiStack();
  const [isOpenProductListModal, setIsOpenProductListModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: Validator.string("Title"),
      description: Validator.string("Description"),
      discount_type: Validator.string("Discount Type"),
      start_date: Validator.date("Start Date"),
      end_date: Validator.date("End Date").min(
        yup.ref("start_date"),
        "End date must be after start date",
      ),
      row_status: Validator.row_status("Status"),
      products: yup
        .array()
        .min(1, "At least one product must be selected")
        .label("Products"),
      discount_value: yup.mixed().when("discount_type", {
        is: (value) => value !== "WEIGHTED",
        then: (schema) =>
          schema
            .required("Discount value is required")
            .test(
              "is-valid-discount",
              "Invalid discount value",
              function (value) {
                if (this.parent.discount_type === "PERCENTAGE") {
                  return value >= 0 && value <= 100;
                }
                return value >= 0;
              },
            ),
        otherwise: (schema) => schema.notRequired(),
      }),

      max_weight: yup.number().when("discount_type", {
        is: "WEIGHTED",
        then: (schema) =>
          schema
            .typeError("Max weight must be a number")
            .required("Max weight is required")
            .positive("Must be positive")
            .test(
              "max-greater-than-min",
              "Max weight must be greater than min weight",
              function (value) {
                if (!this.parent.min_weight) return true;
                return value > this.parent.min_weight;
              },
            ),
        otherwise: (schema) => schema.notRequired(),
      }),

      min_weight: yup.number().when("discount_type", {
        is: "WEIGHTED",
        then: (schema) =>
          schema
            .typeError("Min weight must be a number")
            .required("Min weight is required")
            .positive("Must be positive"),
        otherwise: (schema) => schema.notRequired(),
      }),

      unit_price: yup.number().when("discount_type", {
        is: "WEIGHTED",
        then: (schema) =>
          schema
            .typeError("Unit price must be a number")
            .required("Unit price is required")
            .positive("Must be positive"),
        otherwise: (schema) => schema.notRequired(),
      }),
    });
  }, []);
  const {
    register,
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (promotion?.data) {
      reset({
        title: promotion?.data?.title,
        description: promotion?.data?.description,
        discount_type: promotion?.data?.discount_type,
        discount_value: promotion?.data?.discount_value,
        max_weight: promotion?.data?.max_weight,
        min_weight: promotion?.data?.min_weight,
        unit_price: promotion?.data?.unit_price,
        start_date: promotion?.data?.start_date,
        end_date: promotion?.data?.end_date,
        row_status: promotion?.data?.row_status,
        products: promotion?.data?.products || [],
      });

      if (promotion?.data?.products?.length) {
        setSelectedProducts(promotion.data.products);
      }
    } else {
      reset(initialValues);
    }
  }, [promotion?.data, reset]);

  useEffect(() => {
    setValue("products", selectedProducts, { shouldValidate: true });
  }, [selectedProducts, setValue]);

  const handleSubmitProduct = async (data) => {
    try {
      const payload = {
        ...data,
        discount_value: parseInt(data?.discount_value),
        products: selectedProducts.map((product) => product.id),
      };

      if (itemId) {
        await updatePromotion(itemId, payload);
        successStack("Update promotion successfully", "success");
      } else {
        await createPromotion(payload);
        successStack("Promotion Added successfully", "success");
      }

      props.onClose();
      refreshDataTable();
    } catch (error) {
      const message = error?.response?.data?.message || "An error occurred";

      const conflicts = error?.response?.data?.conflicts || [];
      const productNames = conflicts
        .map((conflict) => conflict?.productName)
        .join(", ");

      const fullMessage = productNames
        ? `${message}: ${productNames}`
        : message;

      errorStack(fullMessage, "error");
    }
  };

  const closeProductsListModal = useCallback(() => {
    setIsOpenProductListModal(false);
  }, []);

  const openProductsListModal = useCallback(() => {
    setIsOpenProductListModal(true);
  }, []);

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
            id="title"
            control={control}
            label={"Title"}
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
            disabled={isEdit}
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
            isDisabled={isEdit}
          />
        </Grid>
        {discount_type !== "WEIGHTED" && (
          <Grid item md={6} sx={{ width: "100%" }}>
            <CustomTextInput
              required
              id="discount_value"
              control={control}
              label={"Discount Value"}
              errorInstance={errors}
              register={register}
              isLoading={loading}
              disabled={isEdit}
            />
          </Grid>
        )}

        {discount_type === "WEIGHTED" && (
          <>
            <Grid item md={6} sx={{ width: "100%" }}>
              <CustomTextInput
                required
                id="unit_price"
                control={control}
                label={"Per Unit Value"}
                errorInstance={errors}
                register={register}
                isLoading={loading}
                disabled={isEdit}
              />
            </Grid>
            <Grid item md={6} sx={{ width: "48%" }}>
              <CustomTextInput
                required
                id="min_weight"
                control={control}
                label={"Min Weight"}
                errorInstance={errors}
                register={register}
                isLoading={loading}
                disabled={isEdit}
              />
            </Grid>

            <Grid item md={6} sx={{ width: "48%" }}>
              <CustomTextInput
                required
                id="max_weight"
                control={control}
                label={"Max Weight"}
                errorInstance={errors}
                register={register}
                isLoading={loading}
                disabled={isEdit}
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
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Products: <span style={{ color: "red" }}>*</span>
          </Typography>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {selectedProducts?.length > 0 ? (
              selectedProducts?.map((product) => (
                <Grid item key={product.id}>
                  <Chip
                    label={`${product.name} - $${product.price}`}
                    onDelete={() => {
                      setSelectedProducts((prev) =>
                        prev.filter((p) => p.id !== product.id),
                      );
                    }}
                    disabled={isEdit}
                  />
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography color="textSecondary">
                  No products selected
                </Typography>
              </Grid>
            )}
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            onClick={openProductsListModal}
            disabled={isEdit}
          >
            Select Products
          </Button>

          <input
            {...register("products")}
            type="hidden"
            value={JSON.stringify(selectedProducts?.map((p) => p.id))}
          />
          {errors.products && (
            <Typography
              color="error"
              variant="caption"
              sx={{ display: "block", mt: 1 }}
            >
              {errors.products.message}
            </Typography>
          )}
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
      {isOpenProductListModal && (
        <ProductsListPopup
          key={1}
          onClose={closeProductsListModal}
          setSelectedProducts={setSelectedProducts}
        />
      )}
    </HookFormMuiModal>
  );
};

export default PromotionAddEditPopup;
