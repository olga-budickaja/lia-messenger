import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext"
import { SocketContextProvider } from "./context/SocketContext";
import { MessageContextProvider } from "./context/MessageContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <MessageContextProvider>
                <SocketContextProvider>
                    <App />
                </SocketContextProvider>
            </MessageContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);

