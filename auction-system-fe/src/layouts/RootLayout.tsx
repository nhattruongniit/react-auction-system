import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH_NAME } from "../config";

// services
import authService from "../services/authServices";
import httpRequest from "../services/httpRequest";

// hooks
import { useAppContext } from "../context/AppContext";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  // hooks
  const [userId, setUserId] = React.useState<string>("");
  const navigator = useNavigate();
  const { handleSetUser } = useAppContext();

  // check authorization
  React.useLayoutEffect(() => {
    function initAuth() {
      httpRequest
        .post("/api/auth")
        .then((res) => {
          const { user } = res.data.user;
          setUserId(user.id);
        })
        .catch(() => {
          authService.logOut();
          navigator(PATH_NAME.LOGIN);
        });
    }

    initAuth();
  }, []);

  // initial user
  React.useLayoutEffect(() => {
    if (!userId) return;

    function fetchUser() {
      httpRequest.get(`/api/user/${userId}`).then((res) => {
        const { data } = res.data;
        handleSetUser(data);
      });
    }

    fetchUser();
  }, [userId]);

  return <>{children}</>;
};

export default RootLayout;
