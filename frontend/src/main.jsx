import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from './providers/auth.jsx';
import { UserIdProvider } from './context/userId.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <UserIdProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </UserIdProvider>
    </NextUIProvider>
)
