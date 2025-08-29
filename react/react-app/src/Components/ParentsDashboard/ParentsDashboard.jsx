import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaUsers, FaChartBar, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import './ParentsDashboard.css';

function ParentDashboard() {
  return (
    <div className="dashboard-container">
     
      <aside className="sidebar">
        <div className="sidebar-header">Parents Dashboard</div>
        <nav className="nav">
          <ul>
            <li><FaHome /> Home</li>
            <li><FaBook /> Attendence</li>
            <li><FaUsers /> Students</li>
            <li><FaUserPlus />Teachers</li>
            <li><FaChartBar /> Reports</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <FaSignOutAlt /> Logout
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1>Welcome, Parents!</h1>
          <p>Here’s your dashboard overview.</p>
        </header>

      <section className="categories">
       <Link to="/noteView" className="category-card yellow">Notes</Link>
       <Link to="/homeworkView" className="category-card blue">Homeworks</Link>
       <Link to="/studentsReport" className="category-card green">Reports</Link>
      </section>

        {/* LMS Support */}
        <section className="lms-support">
          <div className="support-box">
            <h2>LMS Support Service</h2>
            <p>
              Welcome to Tikiri PreSchool Learning Management System. If you have any inquiries regarding LMS please contact us.
            </p>
            <p>📧 <strong>admin.vle@icet.lk</strong></p>
            <p>📞 +94 705 722 722</p>
            <p>⏰ 8.00AM - 1.00PM</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-about">
              <img src="/images/d05893072880f958dd98cd2f086f93fa.jpg" alt="ICET Logo" className="footer-logo" />
              <p>
                "To help little minds grow big dreams!
                We create a happy place where children love to explore, 
                play, and learn — getting ready for a bright future full of imagination, 
                kindness, and exciting new ideas!"
              </p>
            </div>

            <div className="footer-links">
              <h3>Important Links</h3>
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/programmes">Programmes</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/libraries">Libraries</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>Contact</h3>
              <p>No 541A, Colombo Road, Anuradhapura, Sri Lanka</p>
              <p>Email - academics@tikiri.lk</p>
              <p>Phone - +94 705 722 722</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              Copyright © 2025 Tikiri | All Rights Reserved.
              Website by <a href="https://feanixlabs.com" target="_blank" rel="noopener noreferrer">Feanix Labs (Private) Limited</a>
            </p>
            <p>
              <a href="#">🌐 https://www.tikiri.lk</a> | 📧 info@tikiri.lk
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ParentDashboard;
