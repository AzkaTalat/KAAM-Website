
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaLaptopCode,
  FaPaintBrush,
  FaTools,
  FaBullhorn,
  FaUserTie,
  FaCheckCircle,
  FaArrowRight,
  FaUsers,
  FaBriefcase,
  FaHandshake
} from 'react-icons/fa';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: <FaLaptopCode />,
      title: 'Technology',
      description: 'Web development, software and IT services'
    },
    {
      icon: <FaPaintBrush />,
      title: 'Design & Creative',
      description: 'Graphic design, UI/UX and creative work'
    },
    {
      icon: <FaTools />,
      title: 'Home Services',
      description: 'Repairing, maintenance and home assistance'
    },
    {
      icon: <FaBullhorn />,
      title: 'Marketing',
      description: 'Digital marketing and social media services'
    }
  ];

  const filteredCategories = categories.filter(category =>
    (category.title + ' ' + category.description)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function handleSearch(e) {
    e.preventDefault();
    setSearchQuery(searchText.trim());
    document.getElementById('categories')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  function clearSearch() {
    setSearchText('');
    setSearchQuery('');
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-7">
              <span className="hero-label">
                YOUR WORK. YOUR OPPORTUNITY.
              </span>

              <h1 className="hero-title">
                Find the Right Work.
                <br />
                <span>Build Your Future.</span>
              </h1>

              <p className="hero-description">
                KAAM connects skilled workers with people who need
                reliable services. Find opportunities, hire talent
                and grow together.
              </p>

              <div className="hero-buttons">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Find Work <FaArrowRight className="ms-2" />
                </Link>

                <a href="#categories" className="btn btn-outline-primary btn-lg">
                  Explore Services
                </a>
              </div>

              <div className="hero-points">
                <span><FaCheckCircle /> Easy to Use</span>
                <span><FaCheckCircle /> Skilled People</span>
                <span><FaCheckCircle /> New Opportunities</span>
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="hero-card">

                <div className="hero-card-top">
                  <div>
                    <small>Find opportunities</small>
                    <h3>What do you need?</h3>
                  </div>

                  <div className="hero-card-icon">
                    <FaBriefcase />
                  </div>
                </div>

                <form onSubmit={handleSearch}>
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search jobs or services..."
                      value={searchText}
                      onChange={e => setSearchText(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3"
                  >
                    Search Opportunities
                  </button>
                </form>

                <div className="mini-info">
                  <div>
                    <FaUsers />
                    <span>For Clients</span>
                  </div>

                  <div>
                    <FaUserTie />
                    <span>For Workers</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section-padding" id="categories">
        <div className="container">

          <div className="section-heading text-center">
            <span>EXPLORE OPPORTUNITIES</span>
            <h2>
              {searchQuery ? 'Search Results' : 'Popular Categories'}
            </h2>

            <p>
              {searchQuery
                ? `Results for "${searchQuery}"`
                : 'Discover services and opportunities that match your skills.'}
            </p>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="row g-4 mt-3">
              {filteredCategories.map((category, index) => (
                <div className="col-md-6 col-lg-3" key={index}>
                  <div className="category-card">

                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <h5>{category.title}</h5>
                    <p>{category.description}</p>

                    <Link to="/signup">
                      Explore <FaArrowRight />
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-4">
              <h4>No results found</h4>
              <p>Try searching for Technology, Design, Home Services or Marketing.</p>
              <button
                className="btn btn-primary"
                onClick={clearSearch}
              >
                Clear Search
              </button>
            </div>
          )}

          {searchQuery && filteredCategories.length > 0 && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary"
                onClick={clearSearch}
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section section-padding" id="how-it-works">
        <div className="container">

          <div className="section-heading text-center">
            <span>SIMPLE PROCESS</span>
            <h2>How KAAM Works</h2>
            <p>Getting started is simple and easy.</p>
          </div>

          <div className="row g-4 mt-3">

            <div className="col-md-4">
              <div className="process-card">
                <div className="process-icon">
                  <FaUserTie />
                </div>

                <span className="step-number">01</span>
                <h4>Create Your Account</h4>
                <p>
                  Sign up as a client or worker and create your profile.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <div className="process-icon">
                  <FaSearch />
                </div>

                <span className="step-number">02</span>
                <h4>Find Your Match</h4>
                <p>
                  Explore available jobs or discover skilled workers.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="process-card">
                <div className="process-icon">
                  <FaHandshake />
                </div>

                <span className="step-number">03</span>
                <h4>Start Working</h4>
                <p>
                  Connect, agree on the work and get things done.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding" id="about">
        <div className="container">
          <div className="row align-items-center g-5">

            <div className="col-lg-6">
              <div className="about-visual">

                <div className="about-main-icon">
                  <FaBriefcase />
                </div>

                <div className="about-floating-card">
                  <FaCheckCircle />

                  <div>
                    <strong>Opportunities for Everyone</strong>
                    <small>Connect. Work. Grow.</small>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-content">

                <span>ABOUT KAAM</span>
                <h2>Connecting Skills with Opportunities</h2>

                <p>
                  KAAM is a digital job and service marketplace designed
                  to bring clients and skilled workers together.
                </p>

                <p>
                  Whether you need a service or want to find work,
                  KAAM makes it easier to discover opportunities,
                  connect with people and get started.
                </p>

                <Link to="/signup" className="btn btn-primary mt-3">
                  Get Started <FaArrowRight className="ms-2" />
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section" id="get-started">
        <div className="container text-center">

          <h2>Ready to Get Started?</h2>

          <p>
            Join KAAM and take your next step towards new opportunities.
          </p>

          <Link to="/signup" className="btn btn-primary btn-lg">
            Create Your Account <FaArrowRight className="ms-2" />
          </Link>

        </div>
      </section>
    </>
  );
}

export default Home;
