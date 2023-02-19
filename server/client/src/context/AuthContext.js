import { createContext, useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
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
        sessionStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        try {
            const fetchUserId = async () => {
                const res = await publicRequest.get(`/users?username=${currentUser.username}`);
                setUserId(res.data[0]?.id);
            }
            fetchUserId()
        } catch (e) {
            console.log(e)
        }

    }, [currentUser]);

    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser,
            userId,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};








