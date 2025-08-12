import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PrivateRoute from "./Privateroutes";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "./Home";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
};

export default AppRoutes;
