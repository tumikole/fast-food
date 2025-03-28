import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";



const OrderComponent = ({ cart, setCart }) => {

  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = async (e) => {
    e.preventDefault()
    localStorage.setItem('userOrdering', JSON.stringify(cart));
    const storedOrder = await localStorage.getItem('userOrdering');

    if (storedOrder) {
      setTimeout(() => {
        navigate('/customer_order_confirmation');
        window.location = '/customer_order_confirmation'
      }, 500);
    }
  };


  const handleRemoveIngredient = (itemId, index) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? {
          ...item,
          ingredients: item.ingredients.filter((_, idx) => idx !== index),
        }
        : item
    );
    setCart(updatedCart);
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Your Order
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2} mb={10}>
        {cart.length === 0 ? (
          <Typography variant="body1" textAlign="center">
            No items in the order
          </Typography>
        ) : (
          cart.map((item) => (
            <Card key={item.id} elevation={3} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Card
                  key={item.id}
                  elevation={3}
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e0e0e0",
                    background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                    padding: "16px",
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        paddingBottom: "10px",
                        borderBottom: "1px solid #ddd"
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        {item.itemName}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="secondary">
                        R {item.totalAmount}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>


                <Box>
                  {item.ingredients.map((ingredient, idx) => {
                    const ingredientList =
                      item.category === "Kota" && ingredient.split(",").map((ing) => ing.trim());

                    return item.category === "Kota" ? (
                      ingredientList.map((ingredient, idx) => (
                        <TableContainer component={Paper} key={idx} sx={{ marginTop: 1, borderRadius: 2 }}>
                          <Table size="small">
                            <TableBody>
                              <TableRow
                                sx={{
                                  "&:nth-of-type(odd)": {
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                  }
                                }}
                              >

                                <TableCell sx={{ padding: 1 }}>  <CheckCircleIcon color="primary" /> {ingredient}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ))
                    ) : (
                      <TableContainer component={Paper} key={idx} sx={{ marginTop: 1, borderRadius: 2 }}>
                        <Table size="small">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                                }
                              }}
                            >
                              <TableCell sx={{ padding: 1, fontWeight: "bold" }}>
                                <CheckCircleIcon color="primary" /> {ingredient.ingredient}
                              </TableCell>
                              <TableCell sx={{ padding: 1 }}>{ingredient.totalAmount}</TableCell>
                              <TableCell sx={{ padding: 1, textAlign: "center" }}>
                                <IconButton
                                  color="error"
                                  size="small"
                                  onClick={() => handleRemoveIngredient(item.id, idx)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    );
                  })}
                </Box>
              </CardContent>
              <Divider sx={{ marginY: 2 }} />
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove {item.category !== "Kota" ? "All Ingredients" : "Item"}
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      {cart.length > 0 && (
        <Box
          onClick={handleCheckout}
          sx={{
            position: "fixed",
            bottom: 76,
            right: 16,
            backgroundColor: "primary.main",
            borderRadius: "50%",
            padding: "10px",
            boxShadow: 3,
            cursor: "pointer",
            border: "1px solid black",
            zIndex: 1000,
          }}
        >
          <PaymentIcon sx={{ color: "white" }} />
        </Box>
      )}
    </Container>
  );
};

export default OrderComponent;
