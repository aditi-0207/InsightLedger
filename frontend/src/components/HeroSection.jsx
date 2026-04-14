import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <header className="hero-wrapper">



    <div className="hero-grid-bg" />
      {/* ================= HERO ================= */}
      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-left">
          <div className="hero-tag">Data Intelligence Platform</div>

          <h1>
            Transform Raw Data into
            <span> Strategic Insights</span>
          </h1>

          <p>
            InsightLedger converts complex datasets into intuitive,
            decision-ready visualizations — empowering organizations
            to detect trends, compare performance, and drive growth.
          </p>

          <div className="hero-buttons">
            <Link to="/upload" className="primary-btn">
  Start Analyzing
</Link>

<Link to="/features" className="secondary-btn">
  View Features
</Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">
          <div className="image-stack">
            <img
              src="https://www.gpstrategies.com/wp-content/uploads/2023/02/SM-Blog-DataAnalystCanHelpMeasurementJourney-MLewis-Jun2022-web.jpg"
              alt="Main Dashboard"
              className="main-image"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;