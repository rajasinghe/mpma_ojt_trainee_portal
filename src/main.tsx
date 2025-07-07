import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/ui/ToastContainer';

import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Loaders
import { adminDashboardLoader, superAdminDashboardLoader } from './loaders/dashboardLoaders';
import { traineePaymentsLoader, traineeAttendanceLoader } from './loaders/traineeLoaders';
import { adminsLoader, traineesLoader } from './loaders/adminLoaders';

// Auth Pages
import Login from './pages/Login';
import Onboarding from './pages/trainee/Onboarding';

// Layouts
import TraineeLayout from './layouts/TraineeLayout';
import AdminLayout from './layouts/AdminLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';

// Trainee Pages
import TraineeDetails from './pages/trainee/TraineeDetails';
import TraineeAttendance from './pages/trainee/TraineeAttendance';
import TraineePayments from './pages/trainee/TraineePayments';
import TraineeCalendar from './pages/trainee/TraineeCalendar';
import TraineeNotifications from './pages/trainee/TraineeNotifications';
import TraineeChat from './pages/trainee/TraineeChat';
import TraineeProfile from './pages/trainee/TraineeProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTrainees from './pages/admin/AdminTrainees';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminPayments from './pages/admin/AdminPayments';
import AdminCalendar from './pages/admin/AdminCalendar';
import AdminMessages from './pages/admin/AdminMessages';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// SuperAdmin Pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import SuperAdminAdmins from './pages/superadmin/SuperAdminAdmins';
import SuperAdminTrainees from './pages/superadmin/SuperAdminTrainees';
import SuperAdminSettings from './pages/superadmin/SuperAdminSettings';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute role="trainee" requiresOnboarding={false}>
        <Onboarding />
      </ProtectedRoute>
    )
  },
  {
    path: "/superadmin",
    element: (
      <ProtectedRoute role="superadmin">
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/superadmin/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <SuperAdminDashboard />,
        loader: superAdminDashboardLoader
      },
      {
        path: "admins",
        element: <SuperAdminAdmins />,
        loader: adminsLoader
      },
      {
        path: "trainees",
        element: <SuperAdminTrainees />,
        loader: traineesLoader
      },
      {
        path: "settings",
        element: <SuperAdminSettings />
      }
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
        loader: adminDashboardLoader
      },
      {
        path: "trainees",
        element: <AdminTrainees />,
        loader: traineesLoader
      },
      {
        path: "attendance",
        element: <AdminAttendance />
      },
      {
        path: "payments",
        element: <AdminPayments />
      },
      {
        path: "calendar",
        element: <AdminCalendar />
      },
      {
        path: "messages",
        element: <AdminMessages />
      },
      {
        path: "reports",
        element: <AdminReports />
      },
      {
        path: "settings",
        element: <AdminSettings />
      }
    ]
  },
  {
    path: "/trainee",
    element: (
      <ProtectedRoute role="trainee">
        <TraineeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/trainee/details" replace />
      },
      {
        path: "details",
        element: <TraineeDetails />
      },
      {
        path: "attendance",
        element: <TraineeAttendance />,
        loader: traineeAttendanceLoader
      },
      {
        path: "payments",
        element: <TraineePayments />,
        loader: traineePaymentsLoader
      },
      {
        path: "calendar",
        element: <TraineeCalendar />
      },
      {
        path: "notifications",
        element: <TraineeNotifications />
      },
      {
        path: "chat",
        element: <TraineeChat />
      },
      {
        path: "profile",
        element: <TraineeProfile />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
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
