import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Header = ({ onCreateTask }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const user = auth.user;

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: null });
    localStorage.removeItem("auth");
    setShowUserMenu(false);
    toast.success("Logged Out Successfully!");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-name">Task Manager</span>
        </NavLink>

        <div className="navbar-nav">
          {user ? (
            <>
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
              <button
                className="nav-link create-task-btn"
                onClick={onCreateTask}
              >
                Create Task
              </button>
              <div className="user-menu">
                <button
                  className="nav-link user-name"
                  onClick={handleUserMenuToggle}
                >
                  {user.name}
                </button>
                {showUserMenu && (
                  <div className="dropdown-menu">
                    <NavLink
                      to="/login"
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
