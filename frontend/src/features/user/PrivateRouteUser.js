import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../features/user/layout/Home";

const PrivateRouteUser = ({ children }) => {
    const isLogin = !!useSelector((state) => state.user.accessToken);
    if (!isLogin) {
        return <Navigate to="/login" />
    }
    return (
        <>
        <Routes>
            <Route path="/home" element={<Home />} />
        </Routes>
        </>
    );
  };
export default PrivateRouteUser