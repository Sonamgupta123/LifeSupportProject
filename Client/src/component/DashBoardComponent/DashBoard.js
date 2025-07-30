import './DashBoard.css';

function DashBoard() {
  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-row">

          {/* Left Column */}
          <div className="dashboard-col dashboard-col-50">
            <div className="dashboard-box">
              <h2 className="dashboard-title">Dashboard</h2>
              <h5 className="dashboard-subtitle">Blood & Organ Donation Overview</h5>
              <p className="dashboard-desc">
                Real-time statistics of lives saved, donor contributions, and urgent needs.
                Stay informed, stay involved, and help save lives.
              </p>
            </div>

            <div className="dashboard-row">
              {/* Urgent Blood Needs */}
              <div className="dashboard-col dashboard-col-50">
                <div className="dashboard-box">
                  <h5 className="dashboard-subtitle">Urgent Blood Needs</h5>
                  <ul className="dashboard-list">
                    <li><span className="critical">O-</span> (Critical)</li>
                    <li><span className="high">B+</span> (High Demand)</li>
                    <li><span className="low">AB-</span> (Low Supply)</li>
                  </ul>
                </div>
              </div>

              {/* Organ Needs */}
              <div className="dashboard-col dashboard-col-50">
                <div className="dashboard-box">
                  <h5 className="dashboard-subtitle">Organ Donation Alerts</h5>
                  <ul className="dashboard-list">
                    <li><span className="critical">Kidney</span> – 5 waiting</li>
                    <li><span className="high">Liver</span> – 3 needed</li>
                    <li><span className="available">Cornea</span> – Available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-col dashboard-col-50">
            <div className="dashboard-row">

              {/* Stats Counters */}
              <div className="dashboard-col dashboard-col-50">
                <div className="dashboard-counter">
                  <div className="dashboard-counter-value">3421<span>+</span></div>
                  <div className="dashboard-counter-text">Lives Saved</div>
                </div>
              </div>

              <div className="dashboard-col dashboard-col-50">
                <div className="dashboard-counter">
                  <div className="dashboard-counter-value">895<span>+</span></div>
                  <div className="dashboard-counter-text">Active Donors</div>
                </div>
              </div>

              <div className="dashboard-col dashboard-col-50">
                <div className="dashboard-counter">
                  <div className="dashboard-counter-value">152<span>+</span></div>
                  <div className="dashboard-counter-text">Organ Matches</div>
                </div>
              </div>

              <div className="dashboard-col dashboard-col-50">
                <div className="dashboard-counter">
                  <div className="dashboard-counter-value">24<span> hrs</span></div>
                  <div className="dashboard-counter-text">Avg. Response Time</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DashBoard;
