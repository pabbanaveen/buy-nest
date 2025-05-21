import React from 'react';
import './Cart.css';
import { Box, Typography, Card, Button, Divider, Avatar, Grid } from '@mui/material';
import Navbar from '../../components/Navbar';
import '../../styles/keap-theme.css';
import { useCart } from '../../context/CartContext';
import { Link as RouterLink } from 'react-router-dom';
import QuantityStepper from '../../components/QuantityStepper';
import KeapButton from '../../components/KeapButton';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Navbar is already global, so don't duplicate it here */}
      <Box className="keap-main-content" sx={{ bgcolor: 'var(--keap-bg)', minHeight: '100vh', p: { xs: 1, md: 4 } }}>
        <Typography variant="h4" className="keap-section-title" sx={{ color: 'var(--keap-primary)', fontWeight: 700, mb: 3 }}>Your Cart</Typography>
        <Grid container spacing={3}>
          <Box sx={{ width: { xs: '100%', md: '66.66%' }, p: 1 }}>
            <Card className="keap-list-card" sx={{ bgcolor: 'var(--keap-card)', borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)', border: '1px solid var(--keap-divider)' }}>
              {cart.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Your cart is empty.
                  </Typography>
                  {/* <Button className="keap-btn" component={RouterLink} to="/products">Go Shopping</Button> */}
                  <KeapButton variant="outlined" sx={{ mt: 'auto' }} component={RouterLink} to="/products">Go Shopping</KeapButton>
                  
                </Box>
              ) : (
                cart.map((item) => (
                  <Box key={item.id} className="keap-list-item" sx={{ alignItems: 'center', bgcolor: 'transparent' }}>
                    <Avatar src={item.image} alt={item.name} className="keap-list-avatar" />
                    <div className="keap-list-text">
                      <Typography fontWeight={600} sx={{ color: 'var(--keap-primary)' }}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Qty: {item.qty}</Typography>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <QuantityStepper
                        value={item.qty}
                        min={1}
                        onChange={qty => {
                          if (qty === 0) removeFromCart(item.id);
                          else {
                            removeFromCart(item.id);
                            for (let i = 0; i < qty; i++) addToCart(item);
                          }
                        }}
                        size="small"
                      />
                    </Box>
                    <Typography fontWeight={700} sx={{ ml: 2, color: 'var(--keap-primary)' }}>${(item.price * item.qty).toFixed(2)}</Typography>
                  </Box>
                ))
              )}
            </Card>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 1 }}>
            <Card className="keap-card" sx={{ bgcolor: 'var(--keap-card)', borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)', border: '1px solid var(--keap-divider)' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--keap-primary)' }}>Summary</Typography>
              <Divider className="keap-divider" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography fontWeight={700}>${subtotal.toFixed(2)}</Typography>
              </Box>
              {/* <Button className="keap-btn" fullWidth>Checkout</Button> */}
                  <KeapButton onClick={() => console.log(" checkout the products")} variant="outlined" sx={{ mt: 'auto' }}>Checkout</KeapButton>
              
            </Card>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
