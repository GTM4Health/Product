import React, { useState, useEffect } from "react"
import Card from "../components/Card";
import Footer from "../layout/pages/Footer";
import Header2 from "../layout/users/Header2";
import MenuBar from "../layout/users/MenuBar";
import useAuth from "../hooks/useAuth";

const HelpPage = () => {
    const Title = "Help";
    const Features = ["feature one","feature two","feature three","feature four","feature five","feature six",];
    const isAuthenticated = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);

    if (!isAuthenticated) {
      // Optional: Show a loading state or return null while checking authentication
      return null;
    }
  return (
    <div className="content page-view">
      <Header2 user={user}/>
      <MenuBar />
      <div className="card-container">
        <Card title = {Title} features = {Features} />
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;