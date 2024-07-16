import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Join from "../pages/Join";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ParticipatedSurveys from "../components/dashboard/user/ParticipatedSurveys";
import ReportedSurveys from "../components/dashboard/user/ReportedSurveys";

import RequestForSurveyor from "../components/dashboard/user/RequestForSurveyor";

import UserDashboardLayout from "../layouts/UserDashboardLayout";

import UserStatistics from "../components/dashboard/user/UserStatistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/join",
        element: (
          <PublicRoute>
            <Join />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },

  // user only
  {
    path: "/dashboard/user",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Mango People routes
      {
        path: "",
        element: <UserStatistics />,
      },
      {
        path: "Send Money",
        element: <ParticipatedSurveys />,
      },
      {
        path: "Cash In",
        element: <RequestForSurveyor />,
      },

      {
        path: "Cash Out",
        element: <ReportedSurveys />,
      },
      {
        path: "Transaction",
        element: <ReportedSurveys />,
      },
    ],
  },
]);

export default router;
