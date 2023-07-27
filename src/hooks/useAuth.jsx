// Used for checking if fields are not empty
// Used for validation.
//
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
