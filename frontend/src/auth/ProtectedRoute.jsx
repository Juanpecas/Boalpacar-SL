import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedInStatus, children }) => {
  if (loggedInStatus === "LOGGED_IN") {
    return children; 
  } else {
    return <Navigate to="/inicio" />; 
  }
};

export default ProtectedRoute;
