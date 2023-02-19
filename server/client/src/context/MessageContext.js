import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
    const [answer, setAnswer] = useState(null);
    const [theme, setTheme] = useState(null );

    return (
        <MessageContext.Provider value={{
            answer,
            setAnswer,
            theme,
            setTheme,
        }}>
            {children}
        </MessageContext.Provider>
    );
};