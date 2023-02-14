import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import MessagePage from "../pages/message-page/MessagePage";

const AppRouter = () => {
    return (
        <Routes >
            <Route path="/">
                <Route index element={<Home/>} />
                <Route path="/message/:id" element={<MessagePage />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;