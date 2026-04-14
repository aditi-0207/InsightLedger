import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UploadPage from "./pages/UploadPage";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Uploads from "./pages/Uploads";

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  ); 
}

export default App;