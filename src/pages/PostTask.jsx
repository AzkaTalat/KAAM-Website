
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';

function PostTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    deadline: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(
      localStorage.getItem('kaamCurrentUser') || 'null'
    );

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const tasks = JSON.parse(
      localStorage.getItem('kaamTasks') || '[]'
    );

    const newTask = {
      id: Date.now(),
      ...formData,
      budget: Number(formData.budget),
      clientEmail: currentUser.email,
      clientName: currentUser.name,
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(
      'kaamTasks',
      JSON.stringify([...tasks, newTask])
    );

    setMessage('Your task has been posted successfully!');

    setFormData({
      title: '',
      category: '',
      description: '',
      budget: '',
      deadline: ''
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="text-center mb-4">
            <FaBriefcase size={35} className="mb-3" />
            <h2 className="fw-bold">Post a Task</h2>
            <p className="text-muted">
              Describe your task and find the right skilled worker.
            </p>
          </div>

          <div className="card border-0 shadow-sm p-4">

            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g. Create a business website"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Category
                </label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Home Services">Home Services</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Task Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  placeholder="Explain what you need..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Budget (PKR)
                </label>
                <input
                  type="number"
                  name="budget"
                  className="form-control"
                  placeholder="Enter your budget"
                  min="1"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
              >
                Post Task
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostTask;
