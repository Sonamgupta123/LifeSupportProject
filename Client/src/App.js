import './App.css';
import Header from './component/HeaderComponent/Header';
import Nav from './component/NavComponent/Nav';
import Banner from './component/BannerComponent/Banner';
import Home from './component/HomeComponent/Home';
import Contact from './component/ContactComponent/Contact';
import { Route,Routes } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer  from './component/FooterComponent/Footer';
import Login from './component/LoginComponent/Login';
import Logout from './component/LogoutComponent/Logout';
import DonorRegister from './component/DonorRegisterComponent/DonorRegister';
import DonorWel from './component/DonorWelComponent/DonorWel';
import AdminWel from './component/AdminWelComponent/AdminWel';
import Queries from './component/QueriesComponent/Queries';
import ManageDonors from './component/ManageDonorsComponent/ManageDonors';
import CpAdmin from './component/CpAdminComponent/CpAdmin';
import EpAdmin from './component/EpAdminComponent/EpAdmin';
import CpDonor from './component/CpDonorComponent/CpDonor';
import EpDonor from './component/EpDonorComponent/EpDonor';
import VerifyDonor from './component/VerifyDonorComponent/VerifyDonor';
function App() {
  

  return (
    <>
            <Header/>

            <Nav/>
           <Banner/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/contact" element={<Contact/>}></Route>
                <Route path="/register" element={<DonorRegister/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/donor" element={<DonorWel/>}></Route>
                <Route path="/queries" element={<Queries/>}></Route>
                <Route path="/admin" element={<AdminWel/>}></Route>
                <Route path="/managedonors" element={<ManageDonors/>}></Route>
                <Route path="/cpadmin" element={<CpAdmin/>}></Route>
                <Route path="/epadmin" element={<EpAdmin/>}></Route>
                <Route path="/cpdonor" element={<CpDonor/>}></Route>
                <Route path="/epdonor" element={<EpDonor/>}></Route>
                <Route path="/verify/:email" element={<VerifyDonor/>}></Route>
            </Routes>
            <Footer/>
    </>
  );
}

export default App;
