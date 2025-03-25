import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, IconButton, Container, CardMedia } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../Navbar/Navbar";
import "./Cart.scss";

const Cart = ({ cart = [], removeItem = () => { }, cartLength }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.totalAmount, 0);
  };

  const handleSaveCartToLocastorage = _ => {
    localStorage.setItem('userOrdering', JSON.stringify(cart));
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar cartLength={cartLength} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <Typography variant="h5" sx={{ color: '#1a1a1a' }}>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              href="/menu"
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                }
              }}
            >
              Go to Menu
            </Button>
          </Box>
        </Container>
      </>

    );
  }

  return (
    <>
      <Navbar cartLength={cartLength} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4
            }}
          >
            Your Cart
          </Typography>

          {cart.map((item, index) => (
            <Card key={index} sx={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardMedia
                component="img"
                sx={{
                  width: 200,
                  objectFit: 'cover',
                  background: '#f5f5f5'
                }}
                image={item.imageUrl}
                alt={item.itemName}
              />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                p: 2
              }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.itemName}
                    </Typography>
                    <IconButton
                      onClick={() => removeItem(item.id)}
                      sx={{
                        color: '#FF6B6B',
                        '&:hover': {
                          background: 'rgba(255,107,107,0.1)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {/* Ingredients Section */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                      Ingredients:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {item.ingredients.map((ing, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            background: 'rgba(255,107,107,0.1)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.875rem'
                          }}
                        >
                          {item.category === "Kota"
                            ? ing
                            : `${ing.ingredient} (${ing.quantity})`
                          }
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  {/* Price and Quantity */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#FF6B6B',
                        fontWeight: 600
                      }}
                    >
                      R{item.totalAmount} {item.category === "Kota" && `| Q: ${item.quantity}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}

          {/* Total Section */}
          <Box sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginTop: '2rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Total: R{calculateTotal()}
            </Typography>
            <Link to="/place_an_order">
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                  }
                }}
                onClick={handleSaveCartToLocastorage}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>

  );
};

export default Cart;
