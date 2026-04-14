import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar-pill container">

        <div className="nav-left">
          <img
  src="/logoledger.png"
  alt="Insight Ledger"
  className="logo"
/>
          <span className="brand-name">InsightLedger</span>
        </div>

        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
        </div>

        <div className="nav-right">
          <Link to="/upload" className="cta-btn">
            Upload Dataset
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;