import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useFetchProducts } from "../../../services/ordersManagement/hooks.js";
import CheckoutDialog from "./CheckoutDialog.jsx";

const CreateOrderPage = () => {
  const { data: products } = useFetchProducts();
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: Math.max(item.quantity - 1, 0) };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const calculateItemDiscount = (item) => {
    if (!item.promotion) return 0;

    switch (item.promotion.discount_type) {
      case "PERCENTAGE":
        return (
          (item.price * item.quantity * item.promotion.discount_value) / 100
        );

      case "FIXED":
        return item.quantity * item.promotion.discount_value;

      case "WEIGHTED":
        const totalWeight = item.weight * item.quantity;

        if (
          totalWeight >= item.promotion.min_weight &&
          (!item.promotion.max_weight ||
            totalWeight <= item.promotion.max_weight)
        ) {
          return item.quantity * item.promotion.unit_price;
        }
        return 0;

      default:
        return 0;
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const itemsWithDiscounts = cart.map((item) => ({
      ...item,
      discount: calculateItemDiscount(item),
    }));

    const totalDiscount = itemsWithDiscounts.reduce(
      (acc, item) => acc + item.discount,
      0,
    );
    const grandTotal = subtotal - totalDiscount;

    return {
      subtotal,
      totalDiscount,
      grandTotal,
      itemsWithDiscounts,
    };
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={2}>
            {products?.data?.items?.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: 320,
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="h6" gutterBottom noWrap>
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          height: 60, // Fixed height for description
                        }}
                      >
                        {product.description}
                      </Typography>
                    </div>

                    <div>
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Weight: {product.weight}g
                      </Typography>
                      {product.promotion && (
                        <Typography
                          variant="caption"
                          display="block"
                          color="error"
                        >
                          {product.promotion.discount_type === "PERCENTAGE"
                            ? `${product.promotion.discount_value}% OFF`
                            : product.promotion.discount_type === "FIXED"
                              ? `$${product.promotion.discount_value} OFF`
                              : `Weight-based discount available`}
                        </Typography>
                      )}
                    </div>
                  </CardContent>
                  <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => addToCart(product)}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5} width={"35%"}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              position: "sticky",
              top: "20px",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} /> Shopping Cart
            </Typography>

            {cart.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ my: 4, textAlign: "center" }}
              >
                Your cart is empty. Add some products!
              </Typography>
            ) : (
              <>
                {cart.map((item) => (
                  <Card
                    key={item.id}
                    sx={{ mb: 2, backgroundColor: "#f9f9f9" }}
                  >
                    <CardContent sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="subtitle1">
                          ${item.price}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => addToCart(item)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        Total weight: {item.weight * item.quantity}g
                      </Typography>

                      {item.promotion && calculateItemDiscount(item) > 0 && (
                        <Typography variant="caption" color="error">
                          Discount: ${calculateItemDiscount(item).toFixed(2)}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Subtotal:</span>
                    <span>${calculateTotals().subtotal.toFixed(2)}</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Total Discount:</span>
                    <span>-${calculateTotals().totalDiscount.toFixed(2)}</span>
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <span>Grand Total:</span>
                    <span>${calculateTotals().grandTotal.toFixed(2)}</span>
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                >
                  Pay Now
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Separate Checkout Dialog Component */}
      <CheckoutDialog
        open={checkoutOpen}
        onClose={closeCheckout}
        orderSummary={calculateTotals()}
      />
    </Container>
  );
};

export default CreateOrderPage;
