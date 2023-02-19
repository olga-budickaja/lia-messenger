import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
    const [answer, setAnswer] = useState(null);
    const [theme, setTheme] = useState(null );
    const [arrivalMessage, setArrivalMessage] = useState(null);

    return (
        <MessageContext.Provider value={{
            answer,
            setAnswer,
            theme,
            setTheme,
            arrivalMessage,
            setArrivalMessage
        }}>
            {children}
        </MessageContext.Provider>
    );
};