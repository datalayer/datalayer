import React from "react";

const LoginForm = React.lazy(() => import("./components/auth/LoginForm"));

const authRoutes = [
  {
    path: "/login",
    component: LoginForm,
  },
];

export default authRoutes;
