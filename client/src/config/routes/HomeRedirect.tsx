import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/Auth/store/useAuthStore";

const HomeRedirect: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/menu" replace />;
};

export default HomeRedirect;