import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({ userToken }) {
  return userToken ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
