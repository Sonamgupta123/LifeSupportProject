import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { donorApi } from '../../apiurl';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [output, setOutput] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const userDetail = { email, password };

    axios
      .post(donorApi + 'login', userDetail)
      .then((response) => {
        const userDetail = response.data.donorList;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('_id', userDetail._id);
        localStorage.setItem('name', userDetail.name);
        localStorage.setItem('email', userDetail.email);
        localStorage.setItem('password', userDetail.password);
        localStorage.setItem('mobile', userDetail.mobile);
        localStorage.setItem('city', userDetail.city);
        localStorage.setItem('address', userDetail.address);
        localStorage.setItem('gender', userDetail.gender);
        localStorage.setItem('donorType', userDetail.donorType);
        localStorage.setItem('bloodGroup', userDetail.bloodGroup);
        localStorage.setItem('role', userDetail.role);
        localStorage.setItem('status', userDetail.status);
        localStorage.setItem('info', userDetail.info);
        

        userDetail.role === 'donor' ? navigate('/donor') : navigate('/admin');
      })
      .catch(() => {
        setOutput('Login unsuccessful');
        setEmail('');
        setPassword('');
      });
  };

  return (
    <div className="login-page">
      <div className="form-card">
        {output && <div className="alert alert-danger text-center">{output}</div>}
        <h2 className="text-center">Login</h2>
        <form>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="d-grid mb-3">
            <button type="button" className="btn btn-danger" onClick={handleSubmit}>
              Login
            </button>
          </div>

          <div className="text-center">
            <p>
              Not registered?{' '}
              <button type="button" className="btn btn-link" onClick={() => navigate('/register')}>
                Register Here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
