// Used for checking if fields are not empty
// Used for validation.
//

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_TIMEOUT = 5*60 * 1000; // 5 minutes
const ACTIVITY_KEY = 'lastActivityTime';

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasAlertedRef = useRef(false);
  const intervalRef = useRef(null);

  const getLastActivity = () => {
    const stored = localStorage.getItem(ACTIVITY_KEY);
    return stored ? parseInt(stored, 10) : Date.now();
  };

  const updateLastActivity = () => {
    localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
    hasAlertedRef.current = false; // reset alert flag
  };

  const logout = () => {
    window.alert('Session expired due to inactivity. You are being logged out.');
    localStorage.removeItem('token');
    localStorage.removeItem(ACTIVITY_KEY);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const handleUserActivity = () => updateLastActivity();
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((event) => window.addEventListener(event, handleUserActivity));

    if (!localStorage.getItem(ACTIVITY_KEY)) updateLastActivity();

    window.addEventListener('storage', (e) => {
      if (e.key === ACTIVITY_KEY) {
        hasAlertedRef.current = false;
      }
    });

    intervalRef.current = setInterval(() => {
      const last = getLastActivity();
      const timeSinceLastActivity = Date.now() - last;

      if (timeSinceLastActivity > INACTIVITY_TIMEOUT && !hasAlertedRef.current) {
        hasAlertedRef.current = true;
        logout();
      }
    }, 1000);

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, handleUserActivity));
      clearInterval(intervalRef.current);
    };
  }, []);

  return isAuthenticated;
};

export default useAuth;


// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 30 minutes

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();
//   const timeoutRef = useRef(null);
//   const activityTimestampRef = useRef(Date.now());

//   // Auth check once on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   // Logout handler
//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   // Reset inactivity timer
//   const resetInactivityTimer = () => {
//     activityTimestampRef.current = Date.now();
//   };

//   // Inactivity checker
//   useEffect(() => {
//     // Check every second
//     timeoutRef.current = setInterval(() => {
//       if (Date.now() - activityTimestampRef.current > INACTIVITY_TIMEOUT) {
//         logout();
//       }
//     }, 1000);

//     const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
//     events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

//     return () => {
//       clearInterval(timeoutRef.current);
//       events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
//     };
//   }, []);

//   return isAuthenticated;
// };

// export default useAuth;

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
