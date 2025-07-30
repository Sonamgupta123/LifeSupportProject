import './Home.css';
import Search from '../SearchComponent/Search';
import DashBoard from '../DashBoardComponent/DashBoard';
function Home() {
  

  return (
    <>
     <section className="section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-10 col-12 text-center mx-auto">
                            <h2 className="mb-5">"One Life, Many Saved"</h2>
                            <p className="mb-0">Join a community of heroes saving lives through the power of blood and organ donation. Whether it's a drop of blood or a vital organ, your gift can offer someone a second chance at life. Register, learn, and take the first step toward being someone's miracle today.</p>
                        </div>
                        
                        <Search/>
                        <DashBoard/>
                    </div>
                </div>
            </section>
            
        
    </>
  );
}

export default Home;
