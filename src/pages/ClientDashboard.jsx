
import { useEffect, useState } from 'react';

import {
  FaBriefcase,
  FaClipboardList,
  FaUsers,
  FaFileAlt,
  FaPlus,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaExchangeAlt,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const navigate = useNavigate();

  // Get logged-in user
  const currentUser = JSON.parse(
    localStorage.getItem('kaamCurrentUser') || 'null'
  );

  const clientName = currentUser?.name || 'Client';

  // Received Offers
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const allOffers = JSON.parse(
      localStorage.getItem('kaamOffers') || '[]'
    );

    const clientOffers = allOffers.filter(
      offer =>
        offer.clientEmail?.toLowerCase() ===
        currentUser?.email?.toLowerCase()
    );

    setOffers(clientOffers);
  }, [currentUser?.email]);

  // Accept or Reject Offer
  function updateOfferStatus(offerId, newStatus) {
    const allOffers = JSON.parse(
      localStorage.getItem('kaamOffers') || '[]'
    );

    const updatedOffers = allOffers.map(offer =>
      offer.id === offerId
        ? { ...offer, status: newStatus }
        : offer
    );

    localStorage.setItem(
      'kaamOffers',
      JSON.stringify(updatedOffers)
    );

    setOffers(
      updatedOffers.filter(
        offer =>
          offer.clientEmail?.toLowerCase() ===
          currentUser?.email?.toLowerCase()
      )
    );
  }

  const stats = [
    {
      title: 'Posted Tasks',
      value: '08',
      icon: <FaClipboardList />
    },
    {
      title: 'Active Tasks',
      value: '03',
      icon: <FaBriefcase />
    },
    {
      title: 'Total Offers',
      value: String(offers.length).padStart(2, '0'),
      icon: <FaFileAlt />
    },
    {
      title: 'Hired Workers',
      value: '05',
      icon: <FaUsers />
    }
  ];

  const tasks = [
    {
      title: 'Website Development',
      category: 'Technology',
      budget: 'Rs. 25,000',
      status: 'In Progress'
    },
    {
      title: 'Logo Design',
      category: 'Design',
      budget: 'Rs. 5,000',
      status: 'Pending'
    },
    {
      title: 'Mobile App UI Design',
      category: 'Design',
      budget: 'Rs. 15,000',
      status: 'Completed'
    }
  ];

  // Switch to Worker Mode
  function switchToWorker() {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const updatedUser = {
      ...currentUser,
      activeMode: 'worker'
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
        ? { ...user, activeMode: 'worker' }
        : user
    );

    localStorage.setItem(
      'kaamUsers',
      JSON.stringify(updatedUsers)
    );

    navigate('/worker-dashboard');
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

            <p className="sidebar-label">CLIENT MENU</p>

            <a href="#overview" className="sidebar-link active">
              <FaClipboardList /> Dashboard
            </a>

            <a href="#tasks" className="sidebar-link">
              <FaBriefcase /> My Tasks
            </a>

            <a href="#workers" className="sidebar-link">
              <FaUsers /> Browse Workers
            </a>

            <a href="#offers" className="sidebar-link">
              <FaFileAlt /> Offers
            </a>

            <a href="#profile" className="sidebar-link">
              <FaUserCircle /> My Profile
            </a>

            {/* SWITCH MODE */}
            <button
              type="button"
              className="sidebar-link mode-switch-link"
              onClick={switchToWorker}
            >
              <FaExchangeAlt /> Switch to Worker
            </button>

            {/* LOGOUT */}
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
                <h3>Client Dashboard</h3>
                <p>Welcome back! Manage your tasks and workers.</p>
              </div>

              <div className="dashboard-user">
                <FaBell />
                <FaUserCircle />
                <span>{clientName}</span>
              </div>
            </div>

            {/* WELCOME SECTION */}
            <div className="dashboard-welcome">
              <div>
                <span>CLIENT PANEL</span>

                <h2>Welcome, {clientName}!</h2>

                <p>
                  Post tasks, explore workers and manage your projects.
                </p>
              </div>

              <Link to="/post-task" className="btn btn-light">
                <FaPlus /> Post a Task
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
                  <Link to="/post-task" className="quick-action">
                    <FaPlus />
                    <span>Post a New Task</span>
                  </Link>
                </div>

                <div className="col-md-4">
                  <a href="#workers" className="quick-action">
                    <FaSearch />
                    <span>Browse Workers</span>
                  </a>
                </div>

                <div className="col-md-4">
                  <a href="#offers" className="quick-action">
                    <FaFileAlt />
                    <span>View Offers</span>
                  </a>
                </div>

              </div>
            </div>

            {/* RECENT TASKS */}
            <div className="dashboard-section" id="tasks">

              <div className="section-title-row">
                <h4>Recent Tasks</h4>
                <span>View All</span>
              </div>

              <div className="table-responsive">
                <table className="table dashboard-table">

                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Category</th>
                      <th>Budget</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.category}</td>
                        <td>{task.budget}</td>
                        <td>
                          <span
                            className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}
                          >
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>

            {/* RECEIVED OFFERS */}
            <div className="dashboard-section" id="offers">

              <div className="section-title-row">
                <h4>Received Offers</h4>
                <span>{offers.length} Offers</span>
              </div>

              {offers.length === 0 ? (

                <div className="card border-0 shadow-sm p-4 text-center">
                  <FaFileAlt
                    size={35}
                    className="mx-auto mb-3"
                    style={{ color: '#0F9D6A' }}
                  />

                  <h5>No Offers Received Yet</h5>

                  <p className="text-secondary mb-0">
                    Offers submitted by workers for your tasks
                    will appear here.
                  </p>
                </div>

              ) : (

                <div className="row g-4">

                  {offers.map(offer => (

                    <div className="col-12" key={offer.id}>

                      <div className="card border-0 shadow-sm p-4">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                          <div>
                            <h5 className="fw-bold mb-1">
                              {offer.jobTitle}
                            </h5>

                            <p className="text-secondary mb-0">
                              Offer from {offer.workerName}
                            </p>
                          </div>

                          <span
                            className={`badge ${
                              offer.status === 'Accepted'
                                ? 'bg-success'
                                : offer.status === 'Rejected'
                                ? 'bg-danger'
                                : 'bg-warning text-dark'
                            }`}
                          >
                            {offer.status || 'Pending'}
                          </span>

                        </div>

                        <hr />

                        <p className="mb-2">
                          <strong>Worker Name:</strong>{' '}
                          {offer.workerName}
                        </p>

                        <p className="mb-2">
                          <strong>Worker Email:</strong>{' '}
                          {offer.workerEmail}
                        </p>

                        <h5 className="mb-3">
                          <strong>Proposed Amount:</strong>{' '}
                          <span style={{ color: '#0F9D6A' }}>
                            PKR {Number(offer.amount).toLocaleString()}
                          </span>
                        </h5>

                        <div
                          className="p-3 rounded mb-3"
                          style={{ background: '#E8F5EE' }}
                        >
                          <strong>Cover Message</strong>

                          <p className="mb-0 mt-2">
                            {offer.message}
                          </p>
                        </div>

                        {(!offer.status || offer.status === 'Pending') ? (

                          <div className="d-flex gap-2 flex-wrap">

                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() =>
                                updateOfferStatus(offer.id, 'Accepted')
                              }
                            >
                              <FaCheck className="me-2" />
                              Accept Offer
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() =>
                                updateOfferStatus(offer.id, 'Rejected')
                              }
                            >
                              <FaTimes className="me-2" />
                              Reject Offer
                            </button>

                          </div>

                        ) : (

                          <p className="text-secondary mb-0">
                            You have {offer.status.toLowerCase()} this offer.
                          </p>

                        )}

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* BROWSE WORKERS */}
            <div className="dashboard-section" id="workers">

              <h4>Find Skilled Workers</h4>

              <p className="text-secondary">
                Discover suitable people for your next project.
              </p>

              <Link to="/browse-workers" className="btn btn-primary">
                Explore Workers
              </Link>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
