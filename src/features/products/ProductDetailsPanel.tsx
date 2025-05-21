import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Button } from '@mui/material';
import { Product } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';
import QuantityStepper from '../../components/QuantityStepper';
import KeapButton from '../../components/KeapButton';

interface ProductDetailsProps {
  product: Product;
  inCart: boolean;
  onAddToCart: (id: number) => void;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, inCart, onAddToCart, onClose }) => {
  const { removeFromCart, cart } = useCart();
  return (
    // <Card className="keap-card" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
    <>
      <Button
        onClick={onClose}
        sx={{ position: 'absolute', top: 25, right: 25, minWidth: 0, width: 36, height: 36, borderRadius: '50%', background: '#f5f7fa', color: '#222b36', fontWeight: 700, fontSize: 20, boxShadow: '0 2px 8px rgba(30, 125, 96, 0.08)' }}
        aria-label="Close details"
      >
        ×
      </Button>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Avatar src={product.image} alt={product.name} className="keap-avatar" sx={{ width: 96, height: 96 }} />
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mt: 2 }}>
        {product.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center', maxWidth: 400 }}>
        {product.description}
      </Typography>
      <Typography variant="h6" fontWeight={700} color="var(--keap-primary)" sx={{ mb: 2 }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {inCart ? (
          <QuantityStepper
            value={cart.find((a) => a.id === product.id)?.qty || product.id}
            min={1}
            onChange={qty => {
              if (qty === 0) removeFromCart(product.id);
              else {
                removeFromCart(product.id);
                for (let i = 0; i < qty; i++) onAddToCart(product.id);
              }
            }}
          />
        ) : (
          // <Button
          //   className="keap-btn"
          //   style={{ background: inCart ? 'var(--keap-primary)' : undefined }}
          //   onClick={() => onAddToCart(product.id)}
          //   disabled={inCart}
          // >
          //   {inCart ? 'Added to Cart' : 'Add to Cart'}
          // </Button>
          <KeapButton onClick={() => onAddToCart(product.id)} variant="outlined" sx={{ mt: 'auto' }}>Add to Cart</KeapButton>
        )}
        {inCart && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeFromCart(product.id)}
            sx={{ ml: 1 }}
          >
            Remove from Cart
          </Button>
        )}
      </Box>
      {/* Product image slides below avatar */}
      <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ borderRadius: 16, width: 220, height: 140, objectFit: 'cover', boxShadow: '0 2px 8px rgba(30, 125, 96, 0.08)' }}
        />
      </Box>
      {/* // </Card> */}
    </>
  );
};

export default ProductDetails;
