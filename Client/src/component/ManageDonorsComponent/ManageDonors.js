import './ManageDonors.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { donorApi } from '../../apiurl';

function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 5;

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    applySearchSort();
  }, [search, donors, sortBy]);

  const fetchDonors = () => {
    axios.get(donorApi + 'fetch')
      .then((res) => {
        const filtered = res.data.filter(d => d.role === 'donor');
        setDonors(filtered);
        setError('');
      })
      .catch(() => setError('Failed to fetch donors'));
  };

  const changeStatus = (_id, action) => {
    const update = (statusMsg, statusCode) => {
      axios.patch(donorApi + 'update', {
        condition_obj: { _id },
        content_obj: { status: statusCode }
      }).then(() => {
        alert(`Donor ${statusMsg}`);
        fetchDonors();
      }).catch(() => alert(`${statusMsg} failed`));
    };

    if (action === 'verify') update("verified", 1);
    else if (action === 'block') update("blocked", 0);
    else if (action === 'delete') {
      axios.delete(donorApi + "delete", { data: { _id } })
        .then(() => {
          alert("Donor deleted");
          fetchDonors();
        })
        .catch(() => alert("Deletion failed"));
    }
  };

  const applySearchSort = () => {
    let filtered = [...donors];

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.name?.toLowerCase().includes(term) ||
        d.email?.toLowerCase().includes(term) ||
        d.bloodGroup?.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'city') {
      filtered.sort((a, b) => a.city.localeCompare(b.city));
    } else if (sortBy === 'bloodGroup') {
      filtered.sort((a, b) => a.bloodGroup.localeCompare(b.bloodGroup));
    }

    setFilteredDonors(filtered);
    setCurrentPage(1); // reset to first page after filtering
  };

  // Pagination Logic
  const indexOfLast = currentPage * donorsPerPage;
  const indexOfFirst = indexOfLast - donorsPerPage;
  const currentDonors = filteredDonors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);

  return (
    <div className="manage-donors-container">
      <h1 className="manage-donors-title">Manage Donors</h1>

      {error && <div className="alert-error">{error}</div>}

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name/email/blood group"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="city">City</option>
          <option value="bloodGroup">Blood Group</option>
        </select>
      </div>

      <div className="table-container">
        <table className="manage-donors-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>City</th>
              <th>Address</th>
              <th>Donor Type</th>
              <th>Blood Group</th>
              <th>Organs</th>
              <th>Available</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDonors.length > 0 ? (
              currentDonors.map((donor, index) => (
                <tr key={donor._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{donor.name}</td>
                  <td>{donor.email}</td>
                  <td>{donor.mobile}</td>
                  <td>{donor.gender}</td>
                  <td>{donor.city}</td>
                  <td>{donor.address}</td>
                  <td>{donor.donorType}</td>
                  <td>{donor.bloodGroup || 'N/A'}</td>
                  <td>{Array.isArray(donor.organs) && donor.organs.length > 0 ? donor.organs.join(', ') : 'N/A'}</td>
                  <td>{donor.available ? 'Yes' : 'No'}</td>
                  <td>{donor.info ? new Date(donor.info).toLocaleDateString() : '-'}</td>
                  <td>
                    {donor.status === 0 ? (
                      <button className="btn-action green" onClick={() => changeStatus(donor._id, 'verify')}>Verify</button>
                    ) : (
                      <button className="btn-action orange" onClick={() => changeStatus(donor._id, 'block')}>Block</button>
                    )}
                  </td>
                  <td>
                    <button className="btn-action red" onClick={() => changeStatus(donor._id, 'delete')}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="no-data">No donors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            &laquo; Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageDonors;
