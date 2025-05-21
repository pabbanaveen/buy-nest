import React, { useState } from 'react';
import './Products.css';
import '../../styles/keap-theme.css';
import { Box, Typography, useMediaQuery, useTheme, Avatar } from '@mui/material';
import { useCart } from '../../context/CartContext';
import ProductDetailsPanel from './ProductDetailsPanel';
import KeapCard from '../../components/KeapCard';
import KeapButton from '../../components/KeapButton';
import QuantityStepper from '../../components/QuantityStepper';
import { ProductImageSlider } from '../../components/ProductImageSlider';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
    price: 99.99,
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected on the go.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
    price: 149.99,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with deep bass and long battery life.',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
    price: 59.99,
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    description: 'Ergonomic gaming mouse with customizable buttons.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 49.99,
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable lighting.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 89.99,
  },
  {
    id: 6,
    name: '4K Monitor',
    description: 'Ultra HD monitor with vibrant colors and high refresh rate.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 299.99,
  },
  {
    id: 7,
    name: 'External SSD',
    description: 'Fast external SSD for quick data transfer.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 129.99,
  },
  {
    id: 8,
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 699.99,
  },
  {
    id: 9,
    name: 'Laptop Stand',
    description: 'Adjustable laptop stand for better ergonomics.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 39.99,
  },
  {
    id: 10,
    name: 'Wireless Charger',
    description: 'Fast wireless charger for compatible devices.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 29.99,
  },
  {
    id: 11,
    name: 'Action Camera',
    description: 'Compact action camera for capturing adventures.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    price: 199.99,
  },
];

const ProductsScreen: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const { cart, addToCart, removeFromCart } = useCart();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const selected = selectedProduct ? products.find((p) => p.id === selectedProduct) : null;
                

  // --- 1st Panel: Product List (scrollable) ---
  const ProductListPanel = (
    <Box
      sx={{
        width: { xs: '100%', md: 340 },
        minWidth: 240,
        maxWidth: 400,
        bgcolor: 'var(--keap-card)',
        borderRadius: 'var(--keap-border-radius)',
        boxShadow: 'var(--keap-shadow)',
        p: { xs: 1, md: 3 },
        mr: { md: 3 },
        height: { xs: 'auto', md: 'calc(100vh - 48px)' },
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" sx={{ color: 'var(--keap-primary)', fontWeight: 700, mb: 2, textAlign: 'center' }}>Products</Typography>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{
            display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2,
            borderRadius: 3,
            bgcolor: selectedProduct === product.id ? 'var(--keap-primary-light)' : 'transparent',
            border: selectedProduct === product.id ? '2px solid var(--keap-primary)' : '2px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => setSelectedProduct(product.id)}
        >
          <Avatar src={product.image} alt={product.name} sx={{ width: 48, height: 48, border: '2px solid #fff', boxShadow: selectedProduct === product.id ? '0 2px 8px rgba(30, 125, 96, 0.16)' : 'none' }} />
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={700} fontSize={18} sx={{ color: '#222b36' }}>{product.name}</Typography>
            <Typography fontSize={15} sx={{ color: '#888', fontWeight: 500 }}>${product.price.toFixed(2)}</Typography>
          </Box>
          {!!cart.find((c) => c.id === product.id) && (
            <span className="keap-list-badge" style={{ background: 'var(--keap-primary)' }}>In Cart</span>
          )}
        </Box>
      ))}
    </Box>
  );

  // --- Grid view when no product is selected (desktop only) ---
  const ProductGridPanel = (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 3,
        p: 3,
        bgcolor: 'var(--keap-bg)',
        overflowY: 'auto',
        height: { xs: 'auto', md: 'calc(100vh - 48px)' },
      }}
    >
      {products.map((product) => (
        <KeapCard key={product.id} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 220 }}>
          <Avatar src={product.image} alt={product.name} sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography fontWeight={700} fontSize={20} sx={{ color: 'var(--keap-primary)', mb: 1 }}>{product.name}</Typography>
          <Typography fontSize={16} sx={{ color: '#888', fontWeight: 500, mb: 2 }}>${product.price.toFixed(2)}</Typography>
          <div>
            <KeapButton variant="outlined" onClick={() => setSelectedProduct(product.id)} sx={{ mt: 'auto' }}>View Details</KeapButton>

            {!!cart.find((c) => c.id === product.id) && (
              <span className="keap-list-badge" style={{ background: 'var(--keap-primary)' }}>In Cart</span>
            )}
          </div>
        </KeapCard>
      ))}
    </Box>
  );

  // --- 2nd Panel: Main Image (not scrollable) ---
  const ProductImagePanel = selectedProduct && selected ? (
    <Box
      sx={{
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 0,
        p: { xs: 1, md: 3 },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 420, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProductImageSlider images={[selected.image, selected.image, selected.image]} />
      </Box>
    </Box>
  ) : null;

  // --- 3rd Panel: Details (scrollable) ---
  const ProductDetailsPanelBox = selectedProduct && selected ? (
    <Box
      sx={{
        flex: 1,
        minWidth: { xs: '100%', md: 340 },
        maxWidth: { xs: '100%', md: 480 },
        bgcolor: 'var(--keap-card)',
        borderRadius: 'var(--keap-border-radius)',
        boxShadow: 'var(--keap-shadow)',
        border: '1px solid var(--keap-divider)',
        p: { xs: 2, md: 3 },
        overflowY: 'auto',
        height: { xs: 'auto', md: '100vh' },
      }}
    >
      <ProductDetailsPanel
        product={selected}
        inCart={!!cart.find((c) => c.id === selected.id)}
        onAddToCart={(id) => {
          const prod = products.find((p) => p.id === id);
          if (prod) addToCart(prod);
        }}
        onClose={() => setSelectedProduct(null)}
      />
    </Box>
  ) : null;

  // --- Responsive Layout ---
  return (
    <Box
      className="keap-main-content"
      sx={{
        display: { xs: 'block', md: 'flex' },
        flexDirection: 'row',
        minHeight: '100vh',
        bgcolor: 'var(--keap-bg)',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        p: { xs: 0, md: 2 },
      }}
    >
      {/* On desktop: show grid if no product selected, 3-panel if selected. On mobile: always stack. */}
      {selectedProduct && !isMdDown ? (
        <>
          {ProductListPanel}
          {ProductImagePanel}
          {ProductDetailsPanelBox}
        </>
      ) : (
        <>{ProductGridPanel}</>
      )}
    </Box>
  );
};

export default ProductsScreen;
