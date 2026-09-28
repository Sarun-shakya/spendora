import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/ui/Spinner.jsx";

// Keeps a logged-in user off /login and /register
export default function PublicOnlyRoute() {
  const { isAuthenticated, bootstrapping } = useAuth();

  if (bootstrapping) return <Spinner full />;
  if (isAuthenticated) return <Navigate to="/app" replace />;
  return <Outlet />;
}
