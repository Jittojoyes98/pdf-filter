import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

const Authorize = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [session, setSession] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { Authorize };
