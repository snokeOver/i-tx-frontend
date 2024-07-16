import Swal from "sweetalert2";
import useData from "./useData";

const useSweetAlert = () => {
  const { currTheme } = useData();
  const fireSwal = (confirmText, sweetTitle = "Are you sure?") => {
    return Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: sweetTitle,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
    });
  };
  return fireSwal;
};

export default useSweetAlert;
