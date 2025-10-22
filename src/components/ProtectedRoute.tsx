// src/components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

/**
 * A smart protected route that:
 *  - Accepts external `isAuthenticated` prop (if parent tracks auth)
 *  - Falls back to Supabase session check for persistence
 *  - Redirects unauthenticated users to `/login`
 */
export function ProtectedRoute({
  children,
  isAuthenticated,
}: ProtectedRouteProps) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifySession = async () => {
      // if parent already confirmed authentication, skip check
      if (isAuthenticated) {
        setVerified(true);
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session) {
        setVerified(false);
      } else {
        setVerified(true);
      }
    };

    verifySession();
  }, [isAuthenticated]);

  // Show loading indicator while verifying
  if (verified === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!verified) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected content
  return <>{children}</>;
}
