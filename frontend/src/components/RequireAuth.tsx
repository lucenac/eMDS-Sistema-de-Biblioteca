import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RequireAuthProps {
  allowedRoles?: ('admin' | 'student')[]; // Lista de quem pode entrar
}

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-primary-bg text-white">Carregando...</div>;
  }

  // Usuário não está logado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Usuário logado, mas sem permissão
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardCorreto = user.role === 'admin' ? '/admin' : '/aluno';
    return <Navigate to={dashboardCorreto} replace />;
  }

  return <Outlet />;
};