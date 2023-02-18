import { createContext, useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );
    const [answer, setAnswer] = useState(null);
    const [themeId, setThemeId] = useState('');
    const [openMessage, setOpenMessage] = useState([]);

    const login = async (data) => {
        await publicRequest.post("auth/login", data, {
            withCredentials: true
        });
        setCurrentUser(data)
    };
    const logout = async () => {
        await publicRequest.post("auth/logout");
        setCurrentUser(null)
    }

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser,
            answer,
            setAnswer,
            themeId,
            setThemeId,
            openMessage,
            setOpenMessage,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};








