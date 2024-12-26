// Used for checking if fields are not empty
// Used for validation.
//

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [lastActivity, setLastActivity] = useState(Date.now());
//   const navigate = useNavigate();
//   const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   const resetActivityTimer = () => {
//     setLastActivity(Date.now());
//   };

//   useEffect(() => {
//     // Check if the user is authenticated
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       logout();
//     }

//     // Event listener for window close to clear session
//     const handleBeforeUnload = () => {
//       logout();
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     // Inactivity timer
//     const interval = setInterval(() => {
//       if (Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
//         logout();
//       }
//     }, 1000);

//     // Activity listeners to reset timer
//     const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
//     activityEvents.forEach((event) => {
//       window.addEventListener(event, resetActivityTimer);
//     });

//     // Cleanup
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       clearInterval(interval);
//       activityEvents.forEach((event) => {
//         window.removeEventListener(event, resetActivityTimer);
//       });
//     };
//   }, [lastActivity, navigate]);

//   return isAuthenticated;
// };

// export default useAuth;

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
