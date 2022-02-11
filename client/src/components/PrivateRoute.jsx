import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading/Loading";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated === undefined ? (
    <Loading />
  ) : isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
