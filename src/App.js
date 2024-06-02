// src/App.js

import React from 'react';
import ChatApp from './components/ChatApp';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyle from './globalStyles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ChatApp />
    </ThemeProvider>
  );
};

export default App;

//end of file