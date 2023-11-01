import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Auth/Authorize";

export const PrivateRoute = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const navigate = useNavigate();
  let user;

  async function readSession() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      console.log("Private route user here");
      setCurrentUser(userInfo);
    } else {
      console.log("No user found");
      navigate("/login");
    }
  }
  useEffect(() => {
    if (!currentUser) {
      readSession();
    }
  }, [currentUser]);

  return <Outlet />;
};
