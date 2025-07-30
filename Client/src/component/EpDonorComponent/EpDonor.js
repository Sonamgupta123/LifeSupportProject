import './EpDonor.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { donorApi } from '../../apiurl';

function EpDonor() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [donorType, setDonorType] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [organ, setOrgan] = useState('');
  const [available, setAvailable] = useState(false);
  const [output, setOutput] = useState('');

  useEffect(() => {
    axios.get(`${donorApi}fetch?email=${localStorage.getItem("email")}`)
      .then(res => {
        const donor = res.data[0];
        setName(donor.name || '');
        setEmail(donor.email || '');
        setMobile(donor.mobile || '');
        setAddress(donor.address || '');
        setCity(donor.city || '');
        setGender(donor.gender || '');
        setDonorType(donor.donorType || '');
        setBloodGroup(donor.bloodGroup || '');
        setOrgan(donor.organ || '');
        setAvailable(donor.available || false);
      })
      .catch(() => setOutput("Failed to load donor profile"));
  }, []);

  const handleSubmit = () => {
    const updatedDonor = {
      condition_obj: { email },
     content_obj: {
  name,
  mobile,
  address,
  city,
  gender,
  donorType,
  bloodGroup: donorType === "blood" ? bloodGroup : "",
  organs: donorType === "organ" ? [organ] : [],
  available
}

    };

    axios.patch(`${donorApi}update`, updatedDonor)
      .then(() => {
        setOutput("Donor profile updated successfully");
        alert("Donor profile updated successfully");

        // ✅ Save to localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("address", address);
        localStorage.setItem("city", city);
        localStorage.setItem("gender", gender);
        localStorage.setItem("donorType", donorType);
        localStorage.setItem("bloodGroup", donorType === "blood" ? bloodGroup : "");
        localStorage.setItem("organs", donorType === "organ" ? organ : "");
        localStorage.setItem("available", available);

        navigate("/donor");
      })
      .catch(() => setOutput("Profile update failed"));
  };

  return (
    <div className="epdonor-container">
      <h2 className="form-title">Edit Donor Profile</h2>
      {output && <div className="output-msg">{output}</div>}

      <form className="epdonor-form">
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
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={e => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={e => setGender(e.target.value)}
            />
            Female
          </label>
        </div>

        <label>Donor Type:</label>
        <select value={donorType} onChange={e => setDonorType(e.target.value)}>
          <option value="">Select Donor Type</option>
          <option value="blood">Blood</option>
          <option value="organ">Organ</option>
        </select>

        {donorType === "blood" && (
          <>
            <label>Blood Group:</label>
            <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
              <option value="">Select Blood Group</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </>
        )}

        {donorType === "organ" && (
          <>
            <label>Select Organ:</label>
            <select value={organ} onChange={e => setOrgan(e.target.value)}>
              <option value="">Select Organ</option>
              <option value="kidney">Kidney</option>
              <option value="liver">Liver</option>
              <option value="heart">Heart</option>
              <option value="lungs">Lungs</option>
              <option value="pancreas">Pancreas</option>
              <option value="intestine">Intestine</option>
            </select>
          </>
        )}

        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={e => setAvailable(e.target.checked)}
          />
          Available for Donation
        </label>

        <button type="button" onClick={handleSubmit}>Update Profile</button>
      </form>
    </div>
  );
}

export default EpDonor;
