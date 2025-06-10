// src/services/alertService.ts
import Swal from "sweetalert2";

export const alertService = {
  success: (message: string, title = "Success") => {
    Swal.fire({
      icon: "success",
      title,
      text: message,
    });
  },

  error: (message: string, title = "Error") => {
    Swal.fire({
      icon: "error",
      title,
      text: message,
    });
  },

  warning: (message: string, title = "Warning") => {
    Swal.fire({
      icon: "warning",
      title,
      text: message,
    });
  },

  info: (message: string, title = "Info") => {
    Swal.fire({
      icon: "info",
      title,
      text: message,
    });
  },

  confirm: async (
    message: string,
    confirmText = "Yes",
    cancelText = "Cancel"
  ) => {
    const result = await Swal.fire({
      icon: "question",
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
    return result.isConfirmed;
  },
};
