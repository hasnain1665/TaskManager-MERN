import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <NavLink to="/" className="footer-brand-link">
              <span className="footer-brand-name">Task Manager</span>
            </NavLink>
            <p className="footer-description">
              Organize your tasks efficiently and boost your productivity.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <NavLink to="/" className="footer-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/create-task" className="footer-link">
                  Create Task
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li>
                <NavLink to="/#" className="footer-link">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/#" className="footer-link">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li>
                <NavLink to="/#" className="footer-link">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/#" className="footer-link">
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Task Manager. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
