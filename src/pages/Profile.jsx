import React from "react";
import VolunteerProfile from "./VolunteerProfile";
import '../styles/VolunteerProfile.css'; // Import your CSS styles
import OrgProfile from "./OrgProfile";
import FanProfile from "./FanProfile";


function Profile() {

  const userType = localStorage.getItem('userType');
    

return (
  <div className="page-container">
  <div className="sidebar">
  </div>
  <div className="content">
    {userType === 'vol' && <VolunteerProfile />}
    {userType === 'org' && <OrgProfile />}
    {userType === 'fan' && <FanProfile />}
  </div>
</div>
);







}
export default Profile;