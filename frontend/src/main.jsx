import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from './providers/auth.jsx';
import store from "./store/store.jsx"
import { Provider } from 'react-redux';
import 'atropos/css'
import ParticlesComponent from "./components/ParticlesComponent"
import {AnimatePresence, motion} from 'framer-motion';

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
        {/* <AnimatePresence mode='wait'> */}
        <motion.div>
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Provider>
        <ParticlesComponent />
        </motion.div>
      {/* </AnimatePresence> */}
    </NextUIProvider>

)
