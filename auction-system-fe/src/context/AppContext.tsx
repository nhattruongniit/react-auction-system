import React from "react";

import { IUser } from "../types/user";

interface AppContextProps {
  user: IUser;
  handleSetUser: (user: IUser) => void;
}

const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => React.useContext(AppContext);

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState({} as IUser);

  function handleSetUser(user: IUser) {
    setUser(user);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        handleSetUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
