import React from 'react';
import './ProductDetails.css';
import '../../styles/keap-theme.css';
import { Box, Typography, Card, CardContent, Button, Avatar } from '@mui/material';
import Navbar from '../../components/Navbar';

const product = {
  id: 1,
  name: 'Wireless Headphones',
  description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
  image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80',
  price: 99.99,
};


// depricated
const ProductDetails: React.FC = () => {
  return (
    <>
      <Navbar title="Product Details" />
      <Box className="keap-main-content" sx={{ minHeight: '100vh', bgcolor: 'var(--keap-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Card className="keap-card" sx={{ maxWidth: 500, width: '100%', mx: 'auto', borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)', bgcolor: 'var(--keap-card)', p: { xs: 2, md: 4 } }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 2, md: 4 } }}>
            <Avatar src={product.image} alt={product.name} className="keap-avatar" sx={{ width: 96, height: 96, mb: 2 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'var(--keap-primary)' }}>{product.name}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              {product.description}
            </Typography>
            <Typography variant="h6" fontWeight={700} color="var(--keap-primary)" sx={{ mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>
            <Button className="keap-btn" fullWidth sx={{ mt: 2 }}>Add to Cart</Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
