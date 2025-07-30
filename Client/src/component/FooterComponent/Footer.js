import './Footer.css';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
function Footer() {
  const[footerContent,setFooterContent]=useState();
  useEffect(()=>{
    setInterval(()=>{
        if(localStorage.getItem('role')=='donor'){
            setFooterContent(
                <>
                <div className="site-footer-bottom">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-md-7 col-12">
                            <p className="copyright-text mb-0">Copyright © 2025 <a href="#">Blood Donor</a> Ips@academy </p>
                        </div>
                        
                        <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                            <ul className="social-icon">
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-twitter"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-facebook"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-instagram"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-linkedin"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="https://youtube.com/templatemo" className="social-icon-link bi-youtube"></a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
                </>
            );
        }else if(localStorage.getItem('role')=='admin'){
            setFooterContent(
                <>
                <div className="site-footer-bottom">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-md-7 col-12">
                            <p className="copyright-text mb-0">Copyright © 2025 <a href="#">Blood Donor</a> Ips@academy </p>
                        </div>
                        
                        <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                            <ul className="social-icon">
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-twitter"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-facebook"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-instagram"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-linkedin"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="https://youtube.com/templatemo" className="social-icon-link bi-youtube"></a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
                </>
            );
        }else{
            setFooterContent(
                <>
                <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12 mb-4">
                        <img src="./assets/images/nlogo.png" className="logo img-fluid" alt=""/>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4">
                        <h5 className="site-footer-title mb-3">Quick Links</h5>

                        <ul className="footer-menu">
                            <li className="footer-menu-item"><Link className="nav-link click-scroll" to="/">Home</Link></li>

                            <li className="footer-menu-item"><Link className="nav-link click-scroll" to="/contact">Contact</Link></li>


                            <li className="footer-menu-item"><Link className="nav-link click-scroll" to="/register">Register</Link></li>

                            <li className="footer-menu-item"> <Link to="/login">Login</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mx-auto">
                        <h5 className="site-footer-title mb-3">Contact Infomation</h5>

                        <p className="text-white d-flex mb-2">
                            <i className="bi-telephone me-2"></i>

                            <a href="tel: 120-240-9600" className="site-footer-link">
                                9876543210
                            </a>
                        </p>

                        <p className="text-white d-flex">
                            <i className="bi-envelope me-2"></i>

                            <a href="mailto:info@yourgmail.com" className="site-footer-link">
                                sonamgupta@gmail.com
                            </a>
                        </p>

                        <p className="text-white d-flex mt-3">
                            <i className="bi-geo-alt me-2"></i>
                            IPS Academy , Indore
                        </p>

                        <a href="#" className="custom-btn btn mt-3">Get Direction</a>
                    </div>
                </div>
            </div>

            <div className="site-footer-bottom">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-md-7 col-12">
                            <p className="copyright-text mb-0">Copyright © 2025 <a href="#">Blood Donor</a> Ips@academy </p>
                        </div>
                        
                        <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                            <ul className="social-icon">
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-twitter"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-facebook"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-instagram"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-linkedin"></a>
                                </li>

                                <li className="social-icon-item">
                                    <a href="https://www.youtube.com/@Simple_talks.753" className="social-icon-link bi-youtube"></a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
                
                </>
            );
        }
    });
  },1);

  return (
    <>
    {
        footerContent
    }
     
    </>
  );
}

export default Footer;