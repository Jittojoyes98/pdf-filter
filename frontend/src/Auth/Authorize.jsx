import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

const Authorize = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    currentUser,
    setCurrentUser,
    setLoading,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { Authorize };
