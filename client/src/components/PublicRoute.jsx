import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated && restricted ? <Navigate to="/" /> : <Component />;
};

export default PublicRoute;
