import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import NiceModal from "@ebay/nice-modal-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <NiceModal.Provider>
            <CssBaseline />
            <App />
          </NiceModal.Provider>
      </ThemeProvider>
  </React.StrictMode>,
)
