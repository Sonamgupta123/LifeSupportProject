import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminWel.css';

function AdminWel() {
  const [adminName, setAdminName] = useState('Admin');
  const [queries, setQueries] = useState([]);
  const [donorsCount, setDonorsCount] = useState(0);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    setAdminName(localStorage.getItem('name') || 'Admin');

    axios.get('http://localhost:3001/contact/fetch')
      .then(res => setQueries(res.data))
      .catch(() => setQueries([]));

    axios.get('http://localhost:3001/donor/fetch')
      .then(res => {
        const nonAdminDonors = res.data.filter(donor => donor.role !== 'admin');
        setDonorsCount(nonAdminDonors.length);
      })
      .catch(() => setDonorsCount(0));
  }, []);

  return (
    <div className="admin-dashboard container py-5">
      <div className="welcome-box">
        <h2>Welcome, {adminName}!</h2>
        <p className="small-text">Here is an overview of recent activity.</p>
      </div>

      <div className="dashboard-cards row mb-5">
        <div className="col-md-4">
          <div className="card stat-card">
            <h5>📥 Contact Queries</h5>
            <h2>{queries.length}</h2>
            <p className="text-muted">Total Messages</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card stat-card">
            <h5>👥 Total Donors</h5>
            <h2>{donorsCount}</h2>
            <p className="text-muted">Registered Donors</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card stat-card">
            <h5>⚙️ Admin Tools</h5>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => navigate('/managedonors')}
            >
              Manage Donors
            </button>
            <button
              className="btn btn-outline-dark btn-sm mt-2"
              onClick={() => navigate('/queries')}
            >
              View Queries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWel;
