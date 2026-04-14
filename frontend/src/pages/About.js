import React from "react";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="about-block">
          <h2>What is InsightLedger?</h2>
          <p>
            InsightLedger transforms raw sales data into meaningful insights.
            It analyzes revenue trends, regional performance, and product-level
            contributions to help businesses make data-driven decisions.
          </p>
        </div>

        <div className="about-block importance-block">
          <h2>How does it help you?</h2>
          <p>
            Organizations generate massive volumes of data but struggle to
            interpret it effectively. InsightLedger converts complex datasets
            into intuitive visualizations for strategic decision-making.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;