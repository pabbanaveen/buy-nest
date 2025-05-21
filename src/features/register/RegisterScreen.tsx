import React from 'react';
import './Register.css';
import { Box, Typography, Card, CardContent, Button, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import '../../styles/keap-theme.css';
import { Link as RouterLink } from 'react-router-dom';

const Register: React.FC = () => {
  // Placeholder for register form
  return (
    <>
      <Navbar title="Register" />
      <Box className="register-bg" sx={{ minHeight: '100vh', bgcolor: 'var(--keap-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Card className="register-card" sx={{ borderRadius: 'var(--keap-border-radius)', boxShadow: 'var(--keap-shadow)', bgcolor: 'var(--keap-card)', maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'var(--keap-primary)' }}>Register</Typography>
            <TextField label="Name" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Password" type="password" fullWidth margin="normal" />
            <Button className="keap-btn" fullWidth component={RouterLink} to="/register" sx={{ mt: 2 }}>Register</Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Register;
