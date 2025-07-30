import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { donorApi } from '../../apiurl';
import axios from 'axios';

function VerifyDonor() {
  const params = useParams();

  useEffect(() => {
    axios.get(donorApi + "fetch?email=" + params.email).then((response) => {
      if (response.data[0]?.__v === 0) {
        const updateDetails = {
          condition_obj: { email: params.email },
          content_obj: { status: 1, __v: 1 }
        };
        axios.patch(donorApi + "update", updateDetails).then(() => {
          console.log("User verified...");
          // Hard reload after update
          window.location.href = "/login"; // or use replace() to prevent back navigation
        });
      } else {
        // Already verified
        window.location.href = "/login";
      }
    });
  }, [params.email]);

  return (
    <div className="verify-donor-container">
      <h2>Verifying your account...</h2>
    </div>
  );
}

export default VerifyDonor;
