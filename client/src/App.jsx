import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import AssessmentPage from './pages/AssessmentPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { useApp } from './context/AppContext';
import { setAuthToken } from './services/api';

const App = () => {
  const { auth } = useApp();

  useEffect(() => {
    setAuthToken(auth?.token || '');
  }, [auth?.token]);

  return (
    <div className="min-h-screen pb-10">
      <Navbar />
      <main className="px-4">
        <Routes>
          <Route path="/" element={auth?.token ? <Navigate to="/assessment" replace /> : <AuthPage />} />
          <Route
            path="/assessment"
            element={(
              <ProtectedRoute>
                <AssessmentPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/admin"
            element={(
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
