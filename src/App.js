import React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Inbox from "./components/Email/Inbox";
import Compose from "./components/Email/Compose";
import Sent from "./components/Email/Sent";
import Login from "./components/Login/Login";
import SideNavBar from "./components/Email/SideNavBar";


const LoggedInLayout = () => (
  <div style={{ display: "flex" }}>
    <SideNavBar />
    <div style={{ flex: 1, padding: "20px" }}>
      <Outlet />
    </div>
  </div>
);

const AppRouter = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  const loggedInRoutes = [
    { path: "", element: <Navigate to="/inbox" replace /> },
    {
      element: <LoggedInLayout />, 
      children: [
        { path: "inbox", element: <Inbox /> },
        { path: "compose", element: <Compose /> },
        { path: "sent", element: <Sent /> },
      ],
    },
    { path: "login", element: <Navigate to="/inbox" replace /> }, 
    { path: "*", element: <Navigate to="/inbox" replace /> }, 
  ];

  const loggedOutRoutes = [
    { path: "", element: <Navigate to="/login" replace /> },
    { path: "login", element: <Login /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      children: isLogin ? loggedInRoutes : loggedOutRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
