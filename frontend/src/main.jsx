import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
