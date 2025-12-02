import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Weather from "../pages/Weather";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../Layout/MainLayout";

function AppRouter() {
    return (
        <Router>
            <Routes >
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/weather/:city" element={<Weather />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;
