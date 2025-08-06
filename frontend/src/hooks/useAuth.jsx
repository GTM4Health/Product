// Used for checking if fields are not empty
// Used for validation.
//
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_TIMEOUT =  5 * 60 * 1000; // 5 minutes
const WARNING_THRESHOLD = 30 * 1000; // 30 seconds before logout

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const logoutTimeoutIdRef = useRef(null);
  const warningTimeoutIdRef = useRef(null);
  const hasWarnedRef = useRef(false);
  const logoutRef = useRef(false);

  const logout = () => {
    if (logoutRef.current) return;
    logoutRef.current = true;

    alert('Session expired due to inactivity. Logging out.');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const showWarning = () => {
    if (!hasWarnedRef.current) {
      alert('You will be logged out in 30 seconds due to inactivity. Proceed with any action to extend your session.');
      hasWarnedRef.current = true;
    }
  };

  const resetTimers = () => {
    // Clear old timers
    if (logoutTimeoutIdRef.current) clearTimeout(logoutTimeoutIdRef.current);
    if (warningTimeoutIdRef.current) clearTimeout(warningTimeoutIdRef.current);

    hasWarnedRef.current = false;
    lastActivityRef.current = Date.now();

    // Set new warning and logout timers
    warningTimeoutIdRef.current = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        showWarning();
      }
    }, INACTIVITY_TIMEOUT - WARNING_THRESHOLD);

    logoutTimeoutIdRef.current = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        logout();
      }
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      resetTimers();
    }
  }, [navigate]);

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    const handleActivity = () => {
      if (document.visibilityState === 'visible') {
        resetTimers();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeSinceLast = Date.now() - lastActivityRef.current;
        if (timeSinceLast >= INACTIVITY_TIMEOUT) {
          logout();
        } else if (timeSinceLast >= INACTIVITY_TIMEOUT - WARNING_THRESHOLD && !hasWarnedRef.current) {
          showWarning();
        } else {
          resetTimers();
        }
      }
    };

    activityEvents.forEach(event => window.addEventListener(event, handleActivity));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(logoutTimeoutIdRef.current);
      clearTimeout(warningTimeoutIdRef.current);
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
