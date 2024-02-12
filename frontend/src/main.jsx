import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <MetaMaskUIProvider sdkOptions={{
      dappMetadata: {
        name: "Zk-Gas",
        url: window.location.href,
      }
      // Other options
    }}>
      <App />
    </MetaMaskUIProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
