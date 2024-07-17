import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Join from "../pages/Join";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import ResetPIN from "../pages/ResetPIN";
import PrivateRoute from "./PrivateRoute";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import UserStatistics from "../components/dashboard/user/UserStatistics";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import ManageUsers from "../components/dashboard/admin/ManageUsers";
// import MonitorAllTx from "../components/dashboard/admin/MonitorAllTx";
import CashOut from "../components/dashboard/user/CashOut";
import AgentDashboardLayout from "../layouts/AgentDashboardLayout";
import AgentDashboard from "../components/dashboard/agent/AgentDashboard";
import PendingTxForAgent from "../components/dashboard/agent/PendingTxForAgent";
import CashIn from "../components/dashboard/user/CashIn";
// import PrivateRoute from "./PrivateRoute";
// import ParticipatedSurveys from "../components/dashboard/user/ParticipatedSurveys";
// import ReportedSurveys from "../components/dashboard/user/ReportedSurveys";

// import RequestForSurveyor from "../components/dashboard/user/RequestForSurveyor";

// import UserDashboardLayout from "../layouts/UserDashboardLayout";

// import UserStatistics from "../components/dashboard/user/UserStatistics";

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
        path: "/reset-pin",
        element: <ResetPIN />,
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

  // Agent only
  {
    path: "/dashboard/agent",
    element: (
      <PrivateRoute>
        <AgentDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <AgentDashboard />,
      },
      {
        path: "pending-tx",
        element: <PendingTxForAgent />,
      },
      {
        path: "tx-history",
        element: <AgentDashboard />,
      },
    ],
  },
  // user only
  {
    path: "/dashboard",
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
        path: "cash-out",
        element: <CashOut />,
      },
      {
        path: "cash-in",
        element: <CashIn />,
      },

      {
        path: "send-money",
        element: <CashOut />,
      },
      {
        path: "tx-history",
        element: <CashOut />,
      },
    ],
  },

  // Admin only
  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute>
        <AdminDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Admin routes
      {
        path: "",
        element: <UserStatistics />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      // {
      //   path: "monitor-tx",
      //   element: <MonitorAllTx />,
      // },
    ],
  },
]);

export default router;
