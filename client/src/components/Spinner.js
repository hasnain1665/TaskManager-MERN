import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Spinner.css";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate(`/${path}`, {
            state: location.pathname,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, location, path]);

  const progressPercent = ((3 - count) / 3) * 100;

  return (
    <div className="spinner-page">
      <div className="spinner-container">
        <div className="icon-container">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        
        <h2 className="title">Unauthorized Access</h2>
        <p className="subtitle">Please login to access this page</p>
        
        <div className="countdown-section">
          <div className="countdown-circle">
            <div className="countdown-number">{count}</div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        
        <p className="redirect-text">Redirecting to Login...</p>
      </div>
    </div>
  );
};

export default Spinner;