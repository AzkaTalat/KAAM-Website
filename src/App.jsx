
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClientDashboard from './pages/ClientDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import PostTask from './pages/PostTask';
import BrowseJobs from './pages/BrowseJobs';
import SendOffer from './pages/SendOffer';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />

        <Route path="/post-task" element={<PostTask />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/send-offer" element={<SendOffer />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
