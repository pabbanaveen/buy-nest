import React from 'react';
import './Login.css';
import { Box, Typography, Card, CardContent, Button, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import '../../styles/keap-theme.css';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  // Placeholder for login form
  return (
    <>
      <Navbar title="Login" />
      <Box className="login-bg" sx={{ minHeight: '100vh', bgcolor: 'var(--keap-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Card className="login-card" sx={{ borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)', bgcolor: 'var(--keap-card)', maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'var(--keap-primary)' }}>Login</Typography>
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />
            <Button className="keap-btn" fullWidth component={RouterLink} to="/login" sx={{ mt: 2 }}>Login</Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;
