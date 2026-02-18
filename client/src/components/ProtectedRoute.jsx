import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useApp();

  if (!auth?.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
