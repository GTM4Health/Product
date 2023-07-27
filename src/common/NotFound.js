// NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
