import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogin}>go to login</button>
    </div>
  );
};

export default HomePage;
