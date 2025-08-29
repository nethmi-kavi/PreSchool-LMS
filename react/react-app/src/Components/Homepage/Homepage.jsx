import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="preschool-home">
      <section className="hero">
        <div className="hero-content">
          <h1>Tikiri PreSchool</h1>
          <h2>Take the First Step to Knowledge with Us</h2>
          <p>Fun and engaging learning for preschoolers</p>
          <br></br>
          <Link to="/login" className="cta-button">Ready to Get Started?</Link>
        </div>
      </section>

      <section className="categories">
        <div className="category-card yellow">Alphabet & Language</div>
        <div className="category-card blue">Numbers & Math</div>
        <div className="category-card teal">Arts & Crafts</div>
        <div className="category-card green">Story Time</div>
        <div className="category-card pink">Music & Rhythm</div>
      </section>
    </div>
  );
}

export default HomePage;
