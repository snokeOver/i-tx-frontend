import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayouts from "../layouts/MainLayouts";

import Join from "../pages/Join";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import ResetPIN from "../pages/ResetPIN";
import PrivateRoute from "./PrivateRoute";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import UserStatistics from "../components/dashboard/user/UserStatistics";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import ManageUsers from "../components/dashboard/admin/ManageUsers";

import CashOut from "../components/dashboard/user/CashOut";
import AgentDashboardLayout from "../layouts/AgentDashboardLayout";
import AgentDashboard from "../components/dashboard/agent/AgentDashboard";
import PendingTxForAgent from "../components/dashboard/agent/PendingTxForAgent";
import CashIn from "../components/dashboard/user/CashIn";
import SendMoney from "../components/dashboard/user/SendMoney";
import HistoryAgent from "../components/dashboard/agent/HistoryAgent";
import HistoryUser from "../components/dashboard/user/HistoryUser";
import MonitorAllTx from "../components/dashboard/admin/MonitorAllTx";
import AdminStatistics from "../components/dashboard/admin/AdminStatistics";
import FeesAndLimits from "../pages/FeesAndLimits";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/fees-limit",
        element: <FeesAndLimits />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
        element: <HistoryAgent />,
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
        element: <SendMoney />,
      },
      {
        path: "tx-history",
        element: <HistoryUser />,
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
        element: <AdminStatistics />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "monitor-tx",
        element: <MonitorAllTx />,
      },
    ],
  },
]);

export default router;
