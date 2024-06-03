// src/App.js
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Dashboard from './Components/Dashboard/Dashboard'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1e1e1e;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const theme = {
  colors: {
    primary: '#282c34',
    secondary: '#61dafb',
    background: '#1e1e1e',
    text: '#ffffff',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Dashboard/>
      
      </div>
    </ThemeProvider>
  );
}

export default App;
