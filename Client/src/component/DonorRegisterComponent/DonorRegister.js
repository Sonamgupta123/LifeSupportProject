import './DonorRegister.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function DonorRegister() {
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    city: '',
    gender: '',
    donorType: '',
    bloodGroup: '',
    organs: [],
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      if (name === 'organs') {
        const updatedOrgans = checked
          ? [...prev.organs, value]
          : prev.organs.filter((org) => org !== value);
        return { ...prev, organs: updatedOrgans };
      }
      if (name === 'donorType') {
        return { ...prev, donorType: value, bloodGroup: '', organs: [] };
      }
      return { ...prev, [name]: type === 'checkbox' ? checked : value };
    });
  };

  const handleSubmit = () => {
    const {
      name,
      email,
      password,
      mobile,
      address,
      city,
      gender,
      donorType,
      bloodGroup,
      organs,
      available,
    } = form;

    if (!name || !email || !password || !mobile || !address || !city || !gender || !donorType)
      return setOutput('Please fill all required fields.');

    if (password.length < 5 || password.length > 10)
      return setOutput('Password must be 5–10 characters.');

    if (donorType === 'blood' && !bloodGroup)
      return setOutput('Please select blood group.');

    if (donorType === 'organ' && organs.length === 0)
      return setOutput('Please select at least one organ.');

    const donorData = {
      name,
      email,
      password,
      mobile,
      address,
      city,
      gender,
      donorType,
      available,
    };

    if (donorType === 'blood') donorData.bloodGroup = bloodGroup;
    else if (donorType === 'organ') donorData.organs = organs;

    axios
      .post('http://localhost:3001/donor/register', donorData)
      .then(() => {
        setOutput('Check The Email Inbox For Verification Link');
        // setTimeout(() => {
        //   navigate('/login');
        // }, 2000);
      })
      .catch(() => {
        setOutput('Registration failed.');
      });
  };

  return (
    <div className="register-container container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="form-card register-form-card bg-white p-4 shadow rounded">
            {output && <div className="alert alert-info">{output}</div>}
            <h2 className="mb-4 text-center">Donor Registration</h2>
            <form>
              {/* Section 1: Basic Info */}
              <h5 className="form-section-title">Personal Information</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Password</label>
                  <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Mobile</label>
                  <input className="form-control" name="mobile" value={form.mobile} onChange={handleChange} />
                </div>
                <div className="col-12 mb-3">
                  <label>Address</label>
                  <textarea className="form-control" name="address" value={form.address} onChange={handleChange}></textarea>
                </div>
              </div>

              {/* Section 2: Location & Identity */}
              <h5 className="form-section-title">Location & Identity</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <select className="form-control" name="city" value={form.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option>Indore</option>
                    <option>Bhopal</option>
                    <option>Ujjain</option>
                    <option>Dewas</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Gender</label>
                  <div className="d-flex gap-3">
                    {['M', 'F', 'Other'].map((g) => (
                      <label key={g} className="me-3">
                        <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} /> {g}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Donation Preferences */}
              <h5 className="form-section-title">Donation Preferences</h5>
              <div className="mb-3">
                <label>Donor Type</label>
                <select className="form-control" name="donorType" value={form.donorType} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="blood">Blood</option>
                  <option value="organ">Organ</option>
                </select>
              </div>

              {form.donorType === 'blood' && (
                <div className="mb-3">
                  <label>Blood Group</label>
                  <select className="form-control" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                      <option key={group}>{group}</option>
                    ))}
                  </select>
                </div>
              )}

              {form.donorType === 'organ' && (
                <div className="mb-3">
                  <label>Organs to Donate</label>
                  {['Kidney', 'Liver', 'Heart', 'Lungs'].map((org) => (
                    <div className="form-check" key={org}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="organs"
                        value={org}
                        checked={form.organs.includes(org)}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{org}</label>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-3 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                />
                <label className="form-check-label">Available for donation</label>
              </div>

              <button type="button" className="btn btn-brownish-red w-100" onClick={handleSubmit}>
                Register
              </button>

              <div className="text-center mt-3">
                Already registered? <Link to="/login">Login here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorRegister;
