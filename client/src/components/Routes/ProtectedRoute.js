import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to access this page.");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
