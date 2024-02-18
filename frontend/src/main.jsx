import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from './providers/auth.jsx';
import store from "./store/store.jsx"
import { Provider } from 'react-redux';
import 'atropos/css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Provider>
    </NextUIProvider>
)
