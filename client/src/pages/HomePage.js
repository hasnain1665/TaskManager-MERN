import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import "./HomePage.css";

const HomePage = () => {
  return (
    <Layout>
      <div className="homepage">
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Organize your work and life, finally.
              </h1>
              <p className="hero-subtitle">
                Become focused, organized, and calm with Task Manager. The
                world's #1 task manager and to-do list app.
              </p>
              <div className="hero-buttons">
                <NavLink to="/register" className="btn btn-primary">
                  Start for free
                </NavLink>
                <NavLink to="/login" className="btn btn-secondary">
                  Login
                </NavLink>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                <div className="task-card">
                  <div className="task-item completed">
                    <div className="task-checkbox checked"></div>
                    <span className="task-text">Buy groceries for dinner</span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <span className="task-text">
                      Call dentist for appointment
                    </span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <span className="task-text">Review monthly budget</span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <span className="task-text">Plan weekend family trip</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-container">
            <h2 className="section-title">Clear your mind</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <div className="icon-organize"></div>
                </div>
                <h3 className="feature-title">Organize</h3>
                <p className="feature-description">
                  Keep everything in its right place with projects, labels, and
                  filters.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <div className="icon-schedule"></div>
                </div>
                <h3 className="feature-title">Schedule</h3>
                <p className="feature-description">
                  Never miss a deadline with due dates, reminders, and recurring
                  tasks.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <div className="icon-collaborate"></div>
                </div>
                <h3 className="feature-title">Collaborate</h3>
                <p className="feature-description">
                  Share projects and assign tasks to bring everyone on the same
                  page.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">Ready to get organized?</h2>
            <p className="cta-subtitle">
              Join millions of people who rely on Task Manager to stay organized
              and get more done.
            </p>
            <div className="cta-buttons">
              <NavLink to="/register" className="btn btn-primary btn-large">
                Get started for free
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
