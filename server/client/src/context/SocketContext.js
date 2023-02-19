import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    return (
        <SocketContext.Provider value={{
            socket
        }}>
            {children}
        </SocketContext.Provider>
    );
};