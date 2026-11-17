
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaLock
} from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSignup(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const users = JSON.parse(
      localStorage.getItem('kaamUsers') || '[]'
    );

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      user => user.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      setError('This email is already registered. Please login.');
      return;
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: 'client'
    };

    users.push(newUser);

    localStorage.setItem('kaamUsers', JSON.stringify(users));

    setSuccess('Account created successfully! Redirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 1200);
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-card">

          <div className="auth-logo">
            <FaBriefcase />
            <span>KAAM.</span>
          </div>

          <h2>Create Your Account</h2>

          <p className="auth-subtitle">
            One account for hiring and finding work.
          </p>

          <form onSubmit={handleSignup}>
            <label>Full Name</label>

            <div className="auth-input">
              <FaUser />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <label>Email Address</label>

            <div className="auth-input">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <label>Password</label>

            <div className="auth-input">
              <FaLock />
              <input
                type="password"
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="auth-message">{error}</p>}
            {success && <p className="auth-success">{success}</p>}

            <button
              type="submit"
              className="btn btn-primary w-100 auth-btn"
            >
              Create Account
            </button>
          </form>

          <p className="auth-bottom">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </section>
  );
}

export default Signup;
