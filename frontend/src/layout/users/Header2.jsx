import React, { useState } from "react";
import Logo from "../../components/Logo";
import LogoutButton from "../../components/logout";
import Settings from "../../components/Settings";
import Help from "../../components/Help";
import DashHomeButton from "../../components/DashHome";

const Header2 = ({ user }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showName, setShowName] = useState(true);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setShowName(true);
  };

  const handleProfileClick = () => {
    setShowName(!showName);
  };

  const preventMenuToggle = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={`toolbar ${userMenuOpen ? "user-menu-open" : ""}`}>
      <Logo />
      {user && 
      <div className="toolbar_left">
      Welcome to GTMScale, {user.name ? user.name : "User"}

      <br/>
       {user.lastLogin ? ("Last Login: "+ user.lastLogin) : 'This is your first login !' }
      </div>
      }
      {/* <div className="toolbar_left">
      Last Login: {user.lastLogin ? (user.lastLogin) : '' }
      </div> */}
      <div className="buttons">
        <div className="search-bar">
          {/* <i className="fas fa-search fa-2x search-icon"></i> */}
        </div>
        <DashHomeButton />
        <div className="user-menu">
          <div className="profile" onClick={toggleUserMenu}>
            <i
              className={`fas fa-user-circle fa-4x profile-icon ${
                userMenuOpen ? "user-menu-open" : ""
              }`}
              onClick={handleProfileClick}
            ></i>
            {user && (
              <span
                className={`highlight-name ${
                  showName && !userMenuOpen ? "visible" : "hidden"
                }`}
              >
                {user.name}
              </span>
            )}
            <div
              className={`user-menu-items ${userMenuOpen ? "open" : "closed"}`}
              onClick={preventMenuToggle}
            >
              <h3 className="user-header">User Portfolio</h3>
              {user && (
                <div className="user-details">
                  <div className="header">
                    <label className="user-label username">Name:&nbsp;</label>
                    <span className="user-size">{user.name}</span>
                  </div>
                  <div className="header">
                    <label className="user-label email">Mail:&nbsp;</label>
                    <span className="user-size">{user.email}</span>
                  </div>
                  {user.role && (
                    <div className="header">
                      <label className="user-label email">Role:&nbsp;</label>
                      <span className="user-size">{user.role}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="user-details-border"></div>
              <Settings />
              <Help />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
