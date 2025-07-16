import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ui/ToastContainer";

import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Loaders
import {
  traineePaymentsLoader,
  traineeAttendanceLoader,
} from "./loaders/traineeLoaders";

// Auth Pages
import Login from "./pages/Login";
import Onboarding from "./pages/trainee/Onboarding";

// Layouts
import TraineeLayout from "./components/layout/TraineeLayout";

// Trainee Pages
import TraineeDetails from "./pages/trainee/TraineeDetails";
import TraineeAttendance from "./pages/trainee/TraineeAttendance";
import TraineePayments from "./pages/trainee/TraineePayments";
import TraineeCalendar from "./pages/trainee/TraineeCalendar";
import TraineeNotifications from "./pages/trainee/TraineeNotifications";
import TraineeChat from "./pages/trainee/TraineeChat";
import TraineeProfile from "./pages/trainee/TraineeProfile";
import TraineeSchedule from "./pages/trainee/TraineeSchedule";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute requiresOnboarding={false}>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trainee",
    element: (
      <ProtectedRoute>
        <TraineeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/trainee/details" replace />,
      },
      {
        path: "details",
        element: <TraineeDetails />,
      },
      {
        path: "schedule",
        element: <TraineeSchedule />,
      },
      {
        path: "attendance",
        element: <TraineeAttendance />,
        loader: traineeAttendanceLoader,
      },
      {
        path: "payments",
        element: <TraineePayments />,
        loader: traineePaymentsLoader,
      },
      {
        path: "calendar",
        element: <TraineeCalendar />,
      },
      {
        path: "notifications",
        element: <TraineeNotifications />,
      },
      {
        path: "chat",
        element: <TraineeChat />,
      },
      {
        path: "profile",
        element: <TraineeProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50 transition-colors">
            <RouterProvider router={router} />
            <ToastContainer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
