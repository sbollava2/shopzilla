import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#f0c14b' },  // Amazon Yellow
    secondary: { main: '#131921' }, // Amazon Dark
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
