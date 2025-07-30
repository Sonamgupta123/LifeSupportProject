import { useEffect, useState } from 'react';
import axios from 'axios';
import './Queries.css';

function Queries() {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/contact/fetch')
      .then((res) => {
        setQueries(res.data);
        setError(null);
      })
      .catch(() => setError('Failed to fetch queries'));
  }, []);

  return (
    <div className="queries-container">
      <h1 className="queries-title">Contact Queries</h1>

      {error && <div className="alert-error">{error}</div>}

      <table className="queries-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {queries.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No queries found.</td>
            </tr>
          ) : (
            queries.map((q, i) => (
              <tr key={q._id}>
                <td>{i + 1}</td>
                <td>{`${q.firstName || ''} ${q.lastName || ''}`.trim()}</td>
                <td>{q.email}</td>
                <td>{q.message}</td>
                <td>{q.info ? new Date(q.info).toLocaleString() : 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Queries;
  