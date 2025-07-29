import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageLoader from "./ui/PageLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

export default function ProtectedRoute({
  children,
  requiresOnboarding = true,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresOnboarding) {
    if (!user.status || user.status == "Pending") {
      return <Navigate to="/onboarding" replace />;
    }
  } else {
    if (user.status && user.status == "Active") {
      return <Navigate to="/trainee" replace />;
    }
  }

  return <>{children}</>;
}
