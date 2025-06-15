// Used for checking if fields are not empty
// Used for validation.
//
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 30 minutes

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const activityTimestampRef = useRef(Date.now());

  // Auth check once on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    activityTimestampRef.current = Date.now();
  };

  // Inactivity checker
  useEffect(() => {
    // Check every second
    timeoutRef.current = setInterval(() => {
      if (Date.now() - activityTimestampRef.current > INACTIVITY_TIMEOUT) {
        logout();
      }
    }, 1000);

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

    return () => {
      clearInterval(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
    };
  }, []);

  return isAuthenticated;
};

export default useAuth;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is authenticated
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       navigate('/login'); // Redirect to login page if not authenticated
//     }
//   }, [navigate]);

//   return isAuthenticated;
// };

// export default useAuth;
