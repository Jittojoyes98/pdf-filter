import toastr from "toastr";

export const showToast = (message, type = "success") => {
  if (type === "success") {
    toastr.error(message, "Success");
  } else {
    toastr.error(message, "Error");
  }
};
export const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo.token;
};
