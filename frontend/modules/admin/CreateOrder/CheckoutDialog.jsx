import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { createOrder } from "../../../services/ordersManagement/ordersService.js";
import useNotiStack from "../../../@manush/hooks/useNotifyStack.js";

const CheckoutDialog = ({ open, onClose, orderSummary }) => {
  const { user } = useSelector((state) => state.auth);
  const { successStack, errorStack } = useNotiStack();
  if (!orderSummary) return null;

  const { itemsWithDiscounts, subtotal, totalDiscount, grandTotal } =
    orderSummary;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        subtotal: orderSummary?.subtotal,
        total_discount: orderSummary?.totalDiscount,
        grand_total: orderSummary?.grandTotal,
        userId: user?.id,
        items:
          orderSummary?.itemsWithDiscounts?.map((item) => ({
            productId: item.id,
            price: item.price,
            quantity: item.quantity,
            discount: item.discount,
          })) || [],
      };

      await createOrder(data);
      successStack("Order created successfully", "success");
      onClose();
    } catch (error) {
      errorStack(error?.response?.data?.message, "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Summary</DialogTitle>
      <form onSubmit={handleSubmit} autoComplete={"off"}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>

          {itemsWithDiscounts?.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Weight: {item.weight}g/unit × {item.quantity} ={" "}
                {item.weight * item.quantity}g total
              </Typography>
              {item.discount > 0 && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ textAlign: "right" }}
                >
                  Discount: -${item.discount.toFixed(2)}
                  {item.promotion && (
                    <span>
                      {item.promotion.discount_type === "PERCENTAGE"
                        ? ` (${item.promotion.discount_value}%)`
                        : item.promotion.discount_type === "WEIGHTED"
                          ? ` (${item.promotion.unit_price} per unit)`
                          : ` (Fixed: $${item.promotion.discount_value})`}
                    </span>
                  )}
                </Typography>
              )}
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Total Discount:</span>
              <span>-${totalDiscount.toFixed(2)}</span>
            </Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="success" type={"submit"}>
            Confirm Payment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CheckoutDialog;
