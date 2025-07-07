import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.password) {
    return alert('Please fill all fields');
  }

  try {
    const res = await API.post('/users/register', form);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
    navigate('/');
  } catch (err) {
    alert('Registration failed');
  }
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Card sx={{ width: '100%', p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Create an Account</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;