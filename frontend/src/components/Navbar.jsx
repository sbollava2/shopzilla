import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(stored);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#131921' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HomeIcon />
          <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none' }}>
            ShopZilla
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>
          {user && (
            <>
              <Button color="inherit" component={Link} to="/orders" startIcon={<Inventory2Icon />}>
                Orders
              </Button>
              <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register" startIcon={<HowToRegIcon />}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
