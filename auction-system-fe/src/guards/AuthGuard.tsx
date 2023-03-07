import React, { FC } from "react";
import { Navigate } from "react-router-dom";

// configs
import { PATH_NAME } from "../config";

// services
import authService from "../services/authServices";

const AuthGuard = ({ children }: React.PropsWithChildren) => {
  const isAuth = authService.getAccessToken();

  if (!isAuth) return <Navigate to={PATH_NAME.LOGIN} />;

  return <>{children}</>;
};

export default AuthGuard;
