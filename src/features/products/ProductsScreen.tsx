import React, { useState } from 'react';
import './Products.css';
import '../../styles/keap-theme.css';
import { Box, Typography, useMediaQuery, useTheme, Grid, Avatar } from '@mui/material';
import { useCart } from '../../context/CartContext';
import ProductDetailsPanel from './ProductDetailsPanel';
import KeapCard from '../../components/KeapCard';
import KeapButton from '../../components/KeapButton';
import ProductListItem from './ProductListItem';
import QuantityStepper from '../../components/QuantityStepper';

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

  // Find the selected product (if any)
  const selected = selectedProduct ? products.find((p) => p.id === selectedProduct) : null;

  // Details panel JSX
  let detailsPanel: React.ReactNode = null;
  if (selectedProduct && selected) {
    if (isSmDown) {
      // Mobile: overlay panel
      detailsPanel = (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <Box
            sx={{
              width: '95vw',
              maxWidth: 400,
              bgcolor: 'var(--keap-card)',
              borderRadius: 'var(--keap-border-radius)',
              boxShadow: 'var(--keap-shadow)',
              p: 2,
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <ProductDetailsPanel
              product={selected}
              inCart={!!cart.find((c) => c.id === selectedProduct)}
              onAddToCart={(id) => {
                const prod = products.find((p) => p.id === id);
                if (prod) addToCart(prod);
              }}
              onClose={() => setSelectedProduct(null)}
            />
          </Box>
        </Box>
      );
    } else {
      // Desktop/tablet: side panel
      detailsPanel = (
        <Box sx={{ flex: 2, minWidth: 400, transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
          <ProductDetailsPanel
            product={selected}
            inCart={!!cart.find((c) => c.id === selectedProduct)}
            onAddToCart={(id) => {
              const prod = products.find((p) => p.id === id);
              if (prod) addToCart(prod);
            }}
            onClose={() => setSelectedProduct(null)}
          />
        </Box>
      );
    }
  }

  // Responsive: show grid or details panel
  return (
    <Box
      className="keap-main-content"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 4 },
        minHeight: '100vh',
        bgcolor: 'var(--keap-bg)',
        position: 'relative',
        overflow: 'hidden', // Prevent main content from scrolling
        height: '100vh', // Ensure full viewport height
      }}
    >
      {/* Products List/Grid Panel */}
      <Box
        sx={{
          flex: selectedProduct && !isSmDown ? '0 0 340px' : 1,
          p: 2,
          minWidth: selectedProduct && !isSmDown ? 320 : undefined,
          maxWidth: selectedProduct && !isSmDown ? 340 : '100%',
          width: selectedProduct && !isSmDown ? 340 : '100%',
          bgcolor: 'var(--keap-card)',
          borderRadius: 'var(--keap-border-radius)',
          boxShadow: 'var(--keap-shadow)',
          border: '1px solid var(--keap-divider)',
          transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
          overflowY: 'auto', // Only this panel scrolls
          height: { xs: 'auto', md: 'calc(100vh - 48px)' }, // Adjust for navbar if needed
          maxHeight: { xs: 'none', md: 'calc(100vh - 48px)' },
        }}
      >
        <Typography
          variant="h6"
          className="keap-section-title"
          sx={{ mb: 2, color: 'var(--keap-primary)', fontWeight: 700, letterSpacing: 0.5 }}
        >
          Products
        </Typography>
        {/* Show grid if no product selected, else show list (desktop/tablet) */}
        {(!selectedProduct || isSmDown) ? (
          <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
            {products.map((product) => {
              const cartItem = cart.find((c) => c.id === product.id);
              return (
                <Box key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, display: 'flex', p: 1 }}>
                  <KeapCard
                    className={`product-card${selectedProduct === product.id ? ' keap-card-active' : ''}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      minHeight: 220,
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s, background 0.2s',
                      background: selectedProduct === product.id ? 'var(--keap-primary-light)' : undefined,
                      boxShadow: selectedProduct === product.id ? '0 8px 32px rgba(30, 125, 96, 0.16)' : 'var(--keap-shadow)',
                      p: 3,
                    }}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={product.image} alt={product.name} className="keap-list-avatar" />
                        <Box>
                          <Typography fontWeight={700} fontSize={20} sx={{ color: 'var(--keap-primary)', fontFamily: 'inherit', mb: 0.5 }}>{product.name}</Typography>
                          <Typography variant="body2" sx={{ color: '#222b36', fontWeight: 500, fontFamily: 'inherit' }}>${product.price.toFixed(2)}</Typography>
                        </Box>
                      </Box>
                      {cartItem ? (
                        <Box onClick={e => e.stopPropagation()}>
                          <QuantityStepper
                            value={cartItem.qty}
                            min={1}
                            onChange={qty => {
                              if (qty === 0) removeFromCart(product.id);
                              else {
                                // Remove all, then add qty times
                                removeFromCart(product.id);
                                for (let i = 0; i < qty; i++) addToCart(product);
                              }
                            }}
                          />
                        </Box>
                      ) : (
                        <KeapButton sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1, boxShadow: '0 2px 8px rgba(30, 125, 96, 0.08)', fontFamily: 'inherit' }} onClick={e => { e.stopPropagation(); addToCart(product); }}>Add to Cart</KeapButton>
                      )}
                    </Box>
                  </KeapCard>
                </Box>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ width: '100%' }}>
            {products.map((product) => (
              <ProductListItem
                key={product.id}
                product={product}
                isViewing={selectedProduct === product.id}
                isInCart={!!cart.find((c) => c.id === product.id)}
                onView={setSelectedProduct}
              />
            ))}
          </Box>
        )}
      </Box>
      {/* Product Details Panel (as overlay on mobile, side panel on desktop/tablet) */}
      {detailsPanel}
    </Box>
  );
};

export default ProductsScreen;
