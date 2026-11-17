
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyBillWave
} from 'react-icons/fa';

function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem('kaamTasks') || '[]'
    );

    setJobs(savedTasks);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || job.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Browse Jobs</h2>
        <p className="text-muted">
          Explore available tasks and find work that matches your skills.
        </p>
      </div>

      <div className="row g-3 mb-4">

        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search jobs by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Design & Creative">Design & Creative</option>
            <option value="Home Services">Home Services</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Available Tasks</h5>
        <span className="text-muted">
          {filteredJobs.length} Jobs Found
        </span>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="row g-4">

          {filteredJobs.map((job) => (
            <div className="col-md-6 col-lg-4" key={job.id}>

              <div className="card h-100 border-0 shadow-sm p-3">

                <div className="d-flex justify-content-between mb-3">
                  <span className="badge bg-success">
                    {job.status}
                  </span>

                  <FaBriefcase className="text-success" size={20} />
                </div>

                <h5 className="fw-bold">{job.title}</h5>

                <p className="text-muted small">
                  {job.category}
                </p>

                <p>
                  {job.description}
                </p>

                <hr />

                <p className="mb-2">
                  <FaMoneyBillWave className="me-2 text-success" />
                  <strong>PKR {Number(job.budget).toLocaleString()}</strong>
                </p>

                <p className="mb-2">
                  <FaCalendarAlt className="me-2 text-success" />
                  Deadline: {job.deadline}
                </p>

                <p className="text-muted small mb-3">
                  Posted by: {job.clientName}
                </p>

                <Link
                  to="/send-offer"
                  state={{ job }}
                  className="btn btn-primary w-100 mt-auto"
                >
                  View & Send Offer
                </Link>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="text-center py-5">
          <FaBriefcase size={40} className="text-muted mb-3" />

          <h5>No Jobs Found</h5>

          <p className="text-muted">
            No tasks are available matching your search.
          </p>
        </div>
      )}

    </div>
  );
}

export default BrowseJobs;
