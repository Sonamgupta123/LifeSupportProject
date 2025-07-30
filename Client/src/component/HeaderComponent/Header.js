import './Header.css';
import {useState,useEffect} from 'react';
import Auth from '../AuthComponent/Auth';

function Header() {
  const[headerContent,setHeaderContent]=useState();

  useEffect(()=>{
    setInterval(()=>{
        if(localStorage.getItem('role')==="donor"){
            setHeaderContent(
                <>
                <header className="site-header">
            <div className="container">
                <div className="row">
                    
                    <div className="col-lg-8 col-12 d-flex flex-wrap">
                        <p className="d-flex me-4 mb-0">
                            <i className="bi-geo-alt me-2"></i>
                               Welcome {localStorage.getItem('name')}                        
                        </p>

                        <p className="d-flex mb-0">
                            <i className="bi-envelope me-2"></i>

                            <a href="mailto:info@company.com">
                                {localStorage.getItem('email')}
                            </a>
                        </p>
                    </div>

                   

                </div>
            </div>
        </header>

                </>
            )
        }
        else if(localStorage.getItem('role')==="admin"){

            setHeaderContent(
                <>
                         <header className="site-header">
            <div className="container">
                <div className="row">
                    
                    <div className="col-lg-8 col-12 d-flex flex-wrap">
                        <p className="d-flex me-4 mb-0">
                            <i className="bi-geo-alt me-2"></i>
                               Welcome Admin : {localStorage.getItem('name')}                        
                        </p>

                        <p className="d-flex mb-0">
                            <i className="bi-envelope me-2"></i>

                            <a href="mailto:info@company.com">
                                {localStorage.getItem('email')}
                            </a>
                        </p>
                    </div>

                   

                </div>
            </div>
        </header>
                </>
            )
        } else {
            setHeaderContent(
                <>
                <header className="site-header">
            <div className="container">
                <div className="row">
                    
                    <div className="col-lg-8 col-12 d-flex flex-wrap">
                        <p className="d-flex me-4 mb-0">
                            <i className="bi-geo-alt me-2"></i>
                            IPS Academy ,Indore
                        </p>

                        <p className="d-flex mb-0">
                            <i className="bi-envelope me-2"></i>

                            <a href="lifesupport@gmail.com">
                                lifesupport@gmail.com
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
                        <ul className="social-icon">
                            <li className="social-icon-item">
                                <a href="/" className="social-icon-link bi-twitter"></a>
                            </li>

                            <li className="social-icon-item">
                                <a href="/" className="social-icon-link bi-facebook"></a>
                            </li>

                            <li className="social-icon-item">
                                <a href="/" className="social-icon-link bi-instagram"></a>
                            </li>

                            <li className="social-icon-item">
                                <a href="/" className="social-icon-link bi-youtube"></a>
                            </li>

                            <li className="social-icon-item">
                                <a href="/" className="social-icon-link bi-whatsapp"></a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </header>

                </>
            )
        }

        

    });
  },1)

  return (
    <>
        <Auth/>
      {headerContent}
        
    </>
  );
}

export default Header;