import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#f0c14b' },
    secondary: { main: '#131921' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
