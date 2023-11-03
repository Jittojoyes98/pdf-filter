import axios from "axios";
import { getToken, showToast } from "./common";
import { useNavigate } from "react-router-dom";

export const loginUser = async ({ email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/login",
      { email, password },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    return true;
  } catch (error) {
    console.log(error?.response?.data?.message);
    return false;
  }
};
export const fileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/upload",
      formData,
      config
    );
    console.log(data);
    return true;
  } catch (error) {
    console.log(error?.response?.data?.message);
    return false;
  }
};
