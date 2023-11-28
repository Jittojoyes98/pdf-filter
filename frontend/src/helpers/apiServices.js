import axios from "axios";
import { getToken } from "./common";
import useToast from "../hooks/useToast";

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
    useToast("Login successful");
    return true;
  } catch (error) {
    console.log(error?.response?.data?.message);
    useToast(error?.response?.data?.message, "error");
    return false;
  }
};

export const currentUserPdfs = async () => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.get("http://localhost:5000/api/user/", config);

    return data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    useToast(error?.response?.data?.message, "error");
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
    useToast("Upload successful");
    return true;
  } catch (error) {
    console.log(error?.response?.data?.message);
    useToast(error?.response?.data?.message, "error");
    return false;
  }
};

export const getCurrentFile = async () => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/user/recentfile",
      config
    );

    // const res = await data.json();
    if (data) {
      useToast("We got it");
    } else {
      useToast("There are no latest uploaded files here", "error");
    }

    console.log(data);

    return data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    useToast(error?.response?.data?.message, "error");
    return false;
  }
};

export const createFile = async (objectData) => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/user/createfile",
      objectData,
      config
    );

    // const res = await data.json();

    useToast("We got it");
    console.log(data);

    return data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    useToast(error?.response?.data?.message, "error");
    return false;
  }
};
