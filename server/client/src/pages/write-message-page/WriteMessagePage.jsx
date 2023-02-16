import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import WriteMessage from "../../components/write-message/WriteMessage";

const WriteMessagePage = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
            {currentUser !== null && (
                <WriteMessage />
            )}
        </>
    );
};

export default WriteMessagePage;