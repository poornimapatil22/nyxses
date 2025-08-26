import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { muiTheme } from '../shared/themes/muiTheme';


export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
