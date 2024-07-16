import { RouterProvider } from "react-router-dom";
import router from "./routes/allRoutes";
import { ToastContainer, toast } from "react-toastify";
import useData from "./hooks/useData";
import { useEffect } from "react";

const App = () => {
  const { toastMsg, setToastMsg, currTheme } = useData();

  //   All toast will fire here
  useEffect(() => {
    if (toastMsg) {
      const firstSpaceIndex = toastMsg.indexOf(" ");
      const type = toastMsg.substring(0, firstSpaceIndex);
      const message = toastMsg.substring(firstSpaceIndex + 1).trim();
      if (type === "suc") {
        toast.success(message, {
          position: "bottom-center",
        });
      } else if (type === "err") {
        toast.error(message, {
          position: "bottom-center",
        });
      } else {
        toast(message, {
          position: "bottom-center",
        });
      }
    }
    setToastMsg("");
  }, [toastMsg]);

  return (
    <div className="font-lato">
      <RouterProvider router={router} />
      <ToastContainer theme={currTheme} autoClose={2600} />
    </div>
  );
};

export default App;
