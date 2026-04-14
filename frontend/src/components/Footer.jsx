import React, { useState, useEffect } from "react";
import "./Footer.css";

function Footer() {
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 100) {
        setShowBrand(true);
      } else {
        setShowBrand(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer">

      {/* Sliding Brand Name */}
      <div className={`footer-brand ${showBrand ? "show" : ""}`}>
        <div className="brand-text">
          InsightLedger
        </div>
      </div>
    </footer>
  );
}

export default Footer;
