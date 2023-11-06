import toastr from "toastr";
toastr.options = {
  positionClass: "toast-top-center",
  hideDuration: 3000,
  timeOut: 5000,
  closeButton: true,
};

const useToast = (message, type = "success") => {
  if (type == "error") {
    toastr.error(message, "error");
  } else {
    toastr.success(message, "Success");
  }
};

export default useToast;
