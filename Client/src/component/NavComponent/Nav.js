import './Nav.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [navContent,setNavContent]=useState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
  
setInterval(()=>{
     if(localStorage.getItem('role')==="donor")
     { 
        setNavContent(
          <>
          
        
      <nav className={`navbar navbar-expand-lg shadow-lg ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img src="./assets/images/nlogo.png" className="logo img-fluid" alt="Kind Heart Charity" />
            <span>
              LifeSupport
              <small>People live when People Give</small>
            </span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link click-scroll" to="/donor">Home</Link>
              </li>
              <li className="nav-item">
                 <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Update Profile</a>
                    <div class="dropdown-menu fade-up m-0">
                        <a class="dropdown-item"><Link to="/cpdonor">Update Password</Link></a>
                        <a class="dropdown-item"><Link to="/epdonor">Update Details</Link></a>
                    </div>
                </div>
              </li>
              
              <li className="nav-item ms-3">
                <a className="nav-link custom-btn custom-border-btn btn" ><Link to="/logout">Logout</Link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
        )
     }
     else if(localStorage.getItem('role')==="admin")
    {
      setNavContent(
        <>
        
      
       <nav className={`navbar navbar-expand-lg shadow-lg ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img src="./assets/images/nlogo.png" className="logo img-fluid" alt="Kind Heart Charity" />
            <span>
              LifeSupport
              <small>People live when People Give</small>
            </span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
             <li className="nav-item">
                <Link className="nav-link click-scroll" to="/admin">Admin_Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link click-scroll" to="/managedonors">Manage Donors</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link click-scroll" to="/queries">Queries</Link>
              </li>
             <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Update Profile</a>
                    <div class="dropdown-menu fade-up m-0">
                        <a class="dropdown-item"><Link to="/cpadmin">Update Password</Link></a>
                        <a class="dropdown-item"><Link to="/epadmin">Update Details</Link></a>
                    </div>
                </div>
              <li className="nav-item ms-3">
                <a className="nav-link custom-btn custom-border-btn btn" ><Link to="/logout">Logout</Link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
      )
     }
     else{
        setNavContent(
          <>
          <nav className={`navbar navbar-expand-lg shadow-lg ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img src="./assets/images/nlogo.png" className="logo img-fluid" alt="Kind Heart Charity" />
            <span>
              LifeSupport
              <small>People live when People Give</small>
            </span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link click-scroll" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link click-scroll" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link click-scroll" to="/register">Register</Link>
              </li>
              <li className="nav-item ms-3">
                <a className="nav-link custom-btn custom-border-btn btn" ><Link to="/login">Login</Link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
          </>
        )
     }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

},1)
  }, []);
    
  return (
    <>
      {
        navContent
      }
    </>
  );
}

export default Nav;
