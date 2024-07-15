import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>hello mainlayouts</p>,
    errorElement: <p>Not found page</p>,
    children: [
      {
        path: "/",
        element: <p>home</p>,
      },
    ],
  },
]);

export default router;
