import React from 'react';
import App from './components/App/App';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import 'normalize.css';

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
