import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Home.css';
import Navbar from '../../components/Navbar';
import '../../styles/keap-theme.css';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Navbar title="Home" />
      <Box className="home-bg" sx={{ minHeight: '100vh', bgcolor: 'var(--keap-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Container maxWidth="sm">
          <Card className="home-card" sx={{ borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)', bgcolor: 'var(--keap-card)', p: 3 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 2, md: 4 } }}>
              <Box className="home-icon" sx={{ bgcolor: 'var(--keap-primary-light)', borderRadius: '50%', p: 2, mb: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <ShoppingCartIcon sx={{ fontSize: 60, color: 'var(--keap-primary)' }} />
              </Box>
              <Typography variant="h4" component="h1" className="home-title" gutterBottom sx={{ color: 'var(--keap-primary)', fontWeight: 700 }}>
                Welcome to BuyNest!
              </Typography>
              <Typography variant="subtitle1" className="home-desc" sx={{ color: '#6c757d', mb: 3, textAlign: 'center' }}>
                Discover the best products at unbeatable prices.<br />
                Start shopping now and enjoy a seamless e-commerce experience.
              </Typography>
              <Button className="keap-btn" size="large" component={RouterLink} to="/products" sx={{ borderRadius: '24px', px: 5, fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
                Shop Now
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Home;
