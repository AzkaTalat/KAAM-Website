
import {
  FaBriefcase,
  FaClipboardList,
  FaMoneyBillWave,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaFileAlt,
  FaExchangeAlt
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

function WorkerDashboard() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem('kaamCurrentUser') || 'null'
  );

  const workerName = currentUser?.name || 'Worker';

  const stats = [
    { title: 'Available Jobs', value: '24', icon: <FaSearch /> },
    { title: 'Active Jobs', value: '03', icon: <FaBriefcase /> },
    { title: 'Submitted Offers', value: '08', icon: <FaFileAlt /> },
    { title: 'Total Earnings', value: 'Rs. 45K', icon: <FaMoneyBillWave /> }
  ];

  const jobs = [
    {
      title: 'Website Development',
      client: 'ABC Company',
      budget: 'Rs. 25,000',
      status: 'In Progress'
    },
    {
      title: 'Graphic Design',
      client: 'Creative Studio',
      budget: 'Rs. 8,000',
      status: 'Pending'
    },
    {
      title: 'Landing Page Design',
      client: 'Digital Agency',
      budget: 'Rs. 12,000',
      status: 'Completed'
    }
  ];

  // Switch to Client Mode
  function switchToClient() {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const updatedUser = {
      ...currentUser,
      activeMode: 'client'
    };

    localStorage.setItem(
      'kaamCurrentUser',
      JSON.stringify(updatedUser)
    );

    const users = JSON.parse(
      localStorage.getItem('kaamUsers') || '[]'
    );

    const updatedUsers = users.map(user =>
      user.email === currentUser.email
        ? { ...user, activeMode: 'client' }
        : user
    );

    localStorage.setItem('kaamUsers', JSON.stringify(updatedUsers));

    navigate('/client-dashboard');
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem('kaamCurrentUser');
    navigate('/login');
  }

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <div className="row">

          {/* SIDEBAR */}
          <aside className="col-lg-2 dashboard-sidebar">

            <h4>
              <FaBriefcase /> KAAM.
            </h4>

            <p className="sidebar-label">WORKER MENU</p>

            <a href="#overview" className="sidebar-link active">
              <FaClipboardList /> Dashboard
            </a>

            <a href="#jobs" className="sidebar-link">
              <FaBriefcase /> My Jobs
            </a>

            <Link to="/browse-jobs" className="sidebar-link">
              <FaSearch /> Browse Jobs
            </Link>

            <a href="#offers" className="sidebar-link">
              <FaFileAlt /> My Offers
            </a>

            <a href="#earnings" className="sidebar-link">
              <FaMoneyBillWave /> Earnings
            </a>

            <a href="#profile" className="sidebar-link">
              <FaUserCircle /> My Profile
            </a>

            <button
              type="button"
              className="sidebar-link mode-switch-link"
              onClick={switchToClient}
            >
              <FaExchangeAlt /> Switch to Client
            </button>

            <button
              type="button"
              className="sidebar-link logout-link"
              onClick={handleLogout}
            >
              Log Out
            </button>

          </aside>

          {/* MAIN CONTENT */}
          <main className="col-lg-10 dashboard-main" id="overview">

            {/* TOPBAR */}
            <div className="dashboard-topbar">
              <div>
                <h3>Worker Dashboard</h3>
                <p>Manage your work and explore new opportunities.</p>
              </div>

              <div className="dashboard-user">
                <FaBell />
                <FaUserCircle />
                <span>{workerName}</span>
              </div>
            </div>

            {/* WELCOME SECTION */}
            <div className="dashboard-welcome worker-welcome">

              <div>
                <span>WORKER PANEL</span>

                <h2>Welcome, {workerName}!</h2>

                <p>
                  Discover jobs, submit offers and grow your career.
                </p>
              </div>

              <Link to="/browse-jobs" className="btn btn-light">
                <FaSearch /> Find Jobs
              </Link>

            </div>

            {/* STATISTICS */}
            <div className="row g-4 mt-2">
              {stats.map((item, index) => (
                <div className="col-sm-6 col-xl-3" key={index}>
                  <div className="stat-card">

                    <div className="stat-icon">
                      {item.icon}
                    </div>

                    <p>{item.title}</p>

                    <h3>{item.value}</h3>

                  </div>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS */}
            <div className="dashboard-section">

              <h4>Quick Actions</h4>

              <div className="row g-3">

                <div className="col-md-4">
                  <Link to="/browse-jobs" className="quick-action">
                    <FaSearch />
                    <span>Find New Jobs</span>
                  </Link>
                </div>

                <div className="col-md-4">
                  <a href="#offers" className="quick-action">
                    <FaFileAlt />
                    <span>My Submitted Offers</span>
                  </a>
                </div>

                <div className="col-md-4">
                  <a href="#earnings" className="quick-action">
                    <FaMoneyBillWave />
                    <span>View Earnings</span>
                  </a>
                </div>

              </div>
            </div>

            {/* RECENT JOBS */}
            <div className="dashboard-section" id="jobs">

              <div className="section-title-row">
                <h4>Recent Jobs</h4>
                <Link to="/browse-jobs">View All</Link>
              </div>

              <div className="table-responsive">
                <table className="table dashboard-table">

                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Client</th>
                      <th>Budget</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map((job, index) => (
                      <tr key={index}>
                        <td>{job.title}</td>
                        <td>{job.client}</td>
                        <td>{job.budget}</td>
                        <td>
                          <span
                            className={`task-status ${job.status.toLowerCase().replace(' ', '-')}`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>

            {/* AVAILABLE JOBS */}
            <div className="dashboard-section" id="available">

              <h4>Explore Available Jobs</h4>

              <p className="text-secondary">
                Find projects that match your skills and interests.
              </p>

              <Link to="/browse-jobs" className="btn btn-primary">
                Browse Jobs
              </Link>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
