import toastr from "toastr";
toastr.options = {
  positionClass: "toast-top-right",
  hideDuration: 3000,
  timeOut: 5000,
  closeButton: true,
};

const useToast = (message, type = "success") => {
  if (type == "error") {
    toastr.error(message, "Error");
  } else {
    toastr.success(message, "Success");
  }
};

export default useToast;
