import React from "react";
import "./Features.css";

function Features() {
  return (
    <section className="features-section">
      <div className="features-container">

        <h1 className="features-title">
          Insight Ledger – Key Features
        </h1>

        <p className="features-intro">
          Insight Ledger is a comprehensive sales data analytics platform designed 
          to transform raw business data into actionable intelligence. Built for 
          decision-makers, analysts, and growing enterprises, it delivers clarity, 
          accuracy, and performance insights in real time.
        </p>

        <h2 className="features-subtitle">Core Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>1. Intelligent Data Upload</h3>
            <p>
              Securely upload CSV and Excel files for instant processing. 
              The platform automatically structures and prepares your data.
            </p>
          </div>

          <div className="feature-card">
            <h3>2. Automated Data Cleaning</h3>
            <p>
              Detects missing values, inconsistent formats, and anomalies 
              to ensure reliable datasets before analysis.
            </p>
          </div>

          <div className="feature-card">
            <h3>3. Real-Time Performance Dashboard</h3>
            <p>
              Live visualization of revenue trends, growth patterns, 
              regional performance, and product insights.
            </p>
          </div>

          <div className="feature-card">
            <h3>4.Monthly Generated Revenue Analysis</h3>
            <p>
              Identify seasonal patterns and performance shifts through 
              structured time-series analysis.
            </p>
          </div>

          <div className="feature-card">
            <h3>5. Regional & Segment Insights</h3>
            <p>
              Compare regions, customer segments, and channels to uncover 
              high-performing markets.
            </p>
          </div>

          <div className="feature-card">
            <h3>6. Product Performance Metrics</h3>
            <p>
              Evaluate top-selling and underperforming products with 
              dynamic ranking tools.
            </p>
          </div>

          <div className="feature-card">
            <h3>7. Interactive Visualizations</h3>
            <p>
              Engage with dynamic line charts, bar graphs, and summary 
              metrics for data-driven storytelling.
            </p>
          </div>

          <div className="feature-card">
            <h3>8.Dynamic Top-N Insights</h3>
            <p>
              Allows you to instantly adjust the number of top-performing cities and states to explore deeper sales trends
            </p>
          </div>

          <div className="feature-card">
            <h3>9. Secure & Scalable Architecture</h3>
            <p>
              Built with modern technologies ensuring security, efficiency, 
              and scalability for growing datasets.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;