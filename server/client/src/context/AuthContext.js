import { createContext, useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
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
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};








