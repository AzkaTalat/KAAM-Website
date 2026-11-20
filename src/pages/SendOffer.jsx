
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SendOffer() {
  const location = useLocation();
  const navigate = useNavigate();

  const job = location.state?.job;

  const [offerData, setOfferData] = useState({
    amount: '',
    message: ''
  });

  const [success, setSuccess] = useState('');

  if (!job) {
    return (
      <div className="container py-5 text-center">
        <h3>Job Not Selected</h3>
        <p className="text-muted">
          Please select a job before sending an offer.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/browse-jobs')}
        >
          Browse Jobs
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setOfferData({
      ...offerData,
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

    const offers = JSON.parse(
      localStorage.getItem('kaamOffers') || '[]'
    );

    const newOffer = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      clientEmail: job.clientEmail,
      clientName: job.clientName,
      workerName: currentUser.name,
      workerEmail: currentUser.email,
      amount: Number(offerData.amount),
      message: offerData.message,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem(
      'kaamOffers',
      JSON.stringify([...offers, newOffer])
    );

    setSuccess('Your offer has been submitted successfully!');

    setOfferData({
      amount: '',
      message: ''
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="text-center mb-4">
            <h2 className="fw-bold">Send Your Offer</h2>
            <p className="text-muted">
              Submit your proposal to the client.
            </p>
          </div>

          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold">{job.title}</h5>

            <p className="text-muted mb-2">
              {job.category}
            </p>

            <p>{job.description}</p>

            <p className="mb-1">
              <strong>Client:</strong> {job.clientName}
            </p>

            <p className="mb-0">
              <strong>Client Budget:</strong> PKR{' '}
              {Number(job.budget).toLocaleString()}
            </p>
          </div>

          <div className="card border-0 shadow-sm p-4">

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Your Offer Amount (PKR)
                </label>

                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Enter your price"
                  min="1"
                  value={offerData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Cover Message
                </label>

                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Explain why you are suitable for this task..."
                  value={offerData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
              >
                Submit Offer
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SendOffer;
