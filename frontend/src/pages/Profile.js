import React from "react";
import Info from "../components/Info";
import Posts from "../components/Posts";
import About from "../components/About";

const Profile = () => {
  return (
    <div className="profile">
      <Info />
      <div className="profilebody">
        <div className="profilebody-left">
          <About/>
        </div>
        <div className="profilebody-center"><Posts /></div>

        <div className="profilebody-right"></div>
        
      </div>
    </div>
  );
};

export default Profile;
