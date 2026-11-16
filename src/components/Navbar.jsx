
import { Link, NavLink } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          <FaBriefcase className="me-2 brand-icon" />
          KAAM<span className="brand-dot">.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">

          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#categories">Categories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#how-it-works">How It Works</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about">About</a>
            </li>
          </ul>

          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="btn btn-outline-primary px-4">
              Login
            </Link>

            <Link to="/signup" className="btn btn-primary px-4">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
