import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../layout/users/Header2';
import useAuth from '../hooks/useAuth';
import Footer from '../layout/pages/Footer';

const NotFoundPage = () => {
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const quotes = [
    "The page you're looking for seems to have taken a little wellness break.",
    "Oops! It looks like the link you followed is on a temporary vacation.",
    "We apologize, but it seems the digital stethoscope couldn't locate this page.",
    "404 – Page not found. Our team is working hard to diagnose and fix this issue.",
    "This page might have made a rounds to other dimensions. We're working to bring it back.",
  ];
  const [randomQuote, setRandomQuote] = useState("");


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);
  
  if(!isAuthenticated){
    return null;
}

  return (
    <>
    <Header2 user={user} />
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-description">
          {randomQuote}
        </p>
        <Link to="/dashboard" className="not-found-link">
          <button className="not-found-button">Return to Dashboard</button>
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NotFoundPage;
