import { useState } from 'react';
import './Search.css';
import axios from 'axios';

function Search() {
  const [type, setType] = useState('');
  const [subtype, setSubtype] = useState('');
  const [location, setLocation] = useState('');
  const [output, setOutput] = useState(null);
  const [donorDetail, setDonorDetail] = useState([]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const organs = ['Kidney', 'Liver', 'Heart', 'Lungs'];

  const handleSubmit = () => {
    if (!type) return setOutput('Please select type');
    if (!subtype) return setOutput(`Please select ${type === 'blood' ? 'blood group' : 'organ'}`);
    if (!location) return setOutput('Location is required');

    const formattedLocation = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();
    setOutput(`Searching for ${type === 'blood' ? `blood group ${subtype}` : subtype} in ${formattedLocation}`);

    setDonorDetail([]); // Clear previous results

    let url = `http://localhost:3001/donor/fetch?donorType=${encodeURIComponent(type)}&city=${encodeURIComponent(formattedLocation)}`;
    if (type === 'blood') {
      url += `&bloodGroup=${encodeURIComponent(subtype)}`;
    } else if (type === 'organ') {
      url += `&organs=${encodeURIComponent(subtype)}`;
    }

    axios.get(url)
      .then((response) => {
        if (response.data.length === 0) {
          setOutput('No donors found');
          setDonorDetail([]);
        } else {
          setDonorDetail(response.data);
          setOutput(null);
        }
      })
      .catch((err) => {
        console.error("Search error:", err);
        setOutput('No donors found');
        setDonorDetail([]);
      });
  };

  return (
    <div className="search-container container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="form-card bg-white p-4 shadow rounded">
            {output && <div className="alert alert-info">{output}</div>}
            <h2 className="mb-4 text-center">Search for Blood / Organ</h2>
            <form>
              <div className="mb-3">
                <label>Type</label>
                <select
                  className="form-control"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setSubtype('');
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="blood">Blood</option>
                  <option value="organ">Organ</option>
                </select>
              </div>

              {type && (
                <div className="mb-3">
                  <label>{type === 'blood' ? 'Blood Group' : 'Organ'}</label>
                  <select
                    className="form-control"
                    value={subtype}
                    onChange={(e) => setSubtype(e.target.value)}
                  >
                    <option value="">Select {type === 'blood' ? 'Blood Group' : 'Organ'}</option>
                    {(type === 'blood' ? bloodGroups : organs).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-3">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or hospital"
                />
              </div>

              <button
                type="button"
                className="btn btn-brownish-red w-100"
                onClick={handleSubmit}
              >
                Search
              </button>
            </form>
          </div>

          <div className="section-title text-start my-5">
            <h1 className="display-5 mb-4 text-primary">See Donor Details</h1>

            {donorDetail.length === 0 ? (
              <div className="text-center text-muted my-4">
                No matching donors found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle shadow-sm">
                  <thead className="bg-light text-center">
                    <tr>
                      <th>Reg ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Donor Type</th>
                      <th>Blood Group</th>
                      <th>Organs</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Gender</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {donorDetail.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td className="text-capitalize">{row.donorType}</td>
                        <td>{row.bloodGroup || '-'}</td>
                        <td>{Array.isArray(row.organs) ? row.organs.join(', ') : '-'}</td>
                        <td>{row.mobile}</td>
                        <td>{row.address}</td>
                        <td>{row.city}</td>
                        <td>{row.gender}</td>
                        <td>
                          <span className={`badge ${row.available ? 'bg-success' : 'bg-secondary'}`}>
                            {row.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Search;
