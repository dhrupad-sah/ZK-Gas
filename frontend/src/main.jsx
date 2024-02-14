import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from './providers/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </NextUIProvider>
)
