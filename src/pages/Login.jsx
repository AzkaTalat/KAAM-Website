
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBriefcase,
  FaEnvelope,
  FaLock
} from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    const users = JSON.parse(
      localStorage.getItem('kaamUsers') || '[]'
    );

    const matchedUser = users.find(
      user =>
        user.email === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!matchedUser) {
      setError('Invalid email or password. Please try again.');
      return;
    }

    const activeMode = matchedUser.activeMode || matchedUser.role || 'client';

    const currentUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role || 'client',
      activeMode: activeMode
    };

    localStorage.setItem(
      'kaamCurrentUser',
      JSON.stringify(currentUser)
    );

    if (activeMode === 'worker') {
      navigate('/worker-dashboard');
    } else {
      navigate('/client-dashboard');
    }
  }

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-card">

          <div className="auth-logo">
            <FaBriefcase />
            <span>KAAM.</span>
          </div>

          <h2>Welcome Back!</h2>

          <p className="auth-subtitle">
            Login to continue to your KAAM account.
          </p>

          <form onSubmit={handleLogin}>
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
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="auth-message">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary w-100 auth-btn"
            >
              Login
            </button>
          </form>

          <p className="auth-bottom">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <button
            className="back-home"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>

        </div>
      </div>
    </section>
  );
}

export default Login;
