import React, { useEffect, useState } from 'react';
import './DonorWel.css';
import axios from 'axios';
import { donorApi } from '../../apiurl';

function DonorWel() {
  const name = localStorage.getItem('name') || 'Donor';
  const bloodGroup = localStorage.getItem('bloodGroup') || 'N/A';
  const city = localStorage.getItem('city') || 'N/A';
  const mobile = localStorage.getItem('mobile') || 'N/A';
  const donorType = localStorage.getItem('donorType') || 'N/A';
  const email = localStorage.getItem('email') || '';
  const nextEligibleDate = '2025-08-15'; // You can calculate this dynamically if needed

  const [organs, setOrgans] = useState([]);
  const [available, setAvailable] = useState(
    localStorage.getItem('available') === 'true'
  );

  useEffect(() => {
    // Fetch donor details to get latest organs/available values from DB
    axios
      .get(`${donorApi}fetch?email=${email}`)
      .then((res) => {
        if (res.data.length > 0) {
          const donor = res.data[0];
          setOrgans(donor.organs || []);
          setAvailable(donor.available);
          // Store latest values in localStorage
          localStorage.setItem('organs', JSON.stringify(donor.organs || []));
          localStorage.setItem('available', donor.available);
        }
      })
      .catch((err) => {
        console.error("Error fetching donor details", err);
      });
  }, [email]);

  const handleToggleAvailability = () => {
    const newStatus = !available;

    axios
      .patch(donorApi + 'update', {
        condition_obj: { email },
        content_obj: { available: newStatus },
      })
      .then(() => {
        setAvailable(newStatus);
        localStorage.setItem('available', newStatus);
      })
      .catch(() => {
        alert('Failed to update availability');
      });
  };

  return (
    <div className="donor-dashboard">
      <div className="welcome-box">
        <h2>Welcome, {name}!</h2>
        <p className="small-text">Thanks for supporting the life-saving mission.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card-block">
          <h5>🗓 Next Eligible Date</h5>
          <p>{nextEligibleDate}</p>
        </div>

        <div className="card-block">
          <h5>🧾 Your Details</h5>
          <p><strong>City:</strong> {city}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
          <p><strong>Type:</strong> {donorType}</p>

          {donorType === 'blood' && (
            <p><strong>Blood Group:</strong> {bloodGroup}</p>
          )}

          {donorType === 'organs' && organs.length > 0 && (
            <div>
              <strong>Organs:</strong>
              <ul>
                {organs.map((organ, idx) => (
                  <li key={idx}>{organ}</li>
                ))}
              </ul>
            </div>
          )}

          {donorType === 'organs' && organs.length === 0 && (
            <p><strong>Organs:</strong> None listed</p>
          )}
        </div>

        <div className="card-block availability-card">

          <h5>📶 Availability</h5>
          <p>Status: <strong>{available ? 'Available' : 'Not Available'}</strong></p>
          <button onClick={handleToggleAvailability}>
            {available ? 'Set Not Available' : 'Set Available'}
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default DonorWel;
