import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import MessagePage from "../pages/message-page/MessagePage";
import WriteMessagePage from "../pages/write-message-page/WriteMessagePage";
import RegistrationPage from "../pages/registration-page/RegistrationPage";
import LoginPage from "../pages/login-page/LoginPage";

const AppRouter = () => {
    return (
        <Routes >
            <Route path="/">
                <Route index element={<Home/>} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="write" element={<WriteMessagePage />} />
                <Route path="/message/:id" element={<MessagePage />} />

            </Route>
        </Routes>
    )
}

export default AppRouter;