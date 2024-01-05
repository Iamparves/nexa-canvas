import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const OnlineRoutes = () => {
  const isOnline = navigator.onLine;

  if (!isOnline) return <Navigate to="/offline" />;

  return <Outlet />;
};

export default OnlineRoutes;
