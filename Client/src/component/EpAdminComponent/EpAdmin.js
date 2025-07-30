import './EpAdmin.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { donorApi } from '../../apiurl';

function EpAdmin() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    axios.get(`${donorApi}fetch?email=${localStorage.getItem("email")}`)
      .then(res => {
        const admin = res.data[0];
        setName(admin.name);
        setEmail(admin.email);
        setMobile(admin.mobile);
        setAddress(admin.address);
        setCity(admin.city);
        setGender(admin.gender);
      })
      .catch(() => setOutput("Failed to load admin profile"));
  }, []);

  const handleSubmit = () => {
    const updatedAdmin = {
      condition_obj: { email },
      content_obj: { name, mobile, address, city, gender }
    };

    axios.patch(`${donorApi}update`, updatedAdmin)
      .then(() => {
        setOutput("Admin profile updated successfully");
        navigate("/epadmin");
      })
      .catch(() => setOutput("Profile update failed"));
  };

  return (
    <div className="epadmin-container">
      <h2 className="form-title">Admin Profile</h2>
      {output && <div className="output-msg">{output}</div>}

      <form className="epadmin-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />

        <label>Email (readonly):</label>
        <input type="email" value={email} readOnly />

        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} />

        <label>Address:</label>
        <textarea value={address} onChange={e => setAddress(e.target.value)} />

        <label>City:</label>
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option>Indore</option>
          <option>Bhopal</option>
          <option>Ujjain</option>
          <option>Gwalior</option>
          <option>Dewas</option>
        </select>

        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)} />
            Female
          </label>
        </div>

        <button type="button" onClick={handleSubmit}>Update Profile</button>
      </form>
    </div>
  );
}

export default EpAdmin;
