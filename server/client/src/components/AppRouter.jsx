import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";

const AppRouter = () => {
    return (
        <Routes >
            <Route path="/">
                <Route index element={<Home/>} />
            </Route>
        </Routes>
    )
}

export default AppRouter;