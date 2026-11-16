
import { FaBriefcase, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row g-4">

          <div className="col-lg-4">
            <h3 className="footer-brand">
              <FaBriefcase className="me-2" />
              KAAM.
            </h3>
            <p>
              Connecting clients with skilled workers.
              Discover opportunities and grow together.
            </p>
          </div>

          <div className="col-md-4 col-lg-2">
            <h5>Quick Links</h5>
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </div>

          <div className="col-md-4 col-lg-3">
            <h5>Our Platform</h5>
            <a href="#get-started">Find Work</a>
            <a href="#get-started">Hire Workers</a>
            <a href="#categories">Explore Services</a>
          </div>

          <div className="col-md-4 col-lg-3">
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="#footer"><FaFacebook /></a>
              <a href="#footer"><FaInstagram /></a>
              <a href="#footer"><FaLinkedin /></a>
            </div>
          </div>

        </div>

        <hr />

        <p className="copyright">
          © 2026 KAAM. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
