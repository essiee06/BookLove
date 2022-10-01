import React from "react";
import { Button } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import "./profile.css";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <img className="profileCoverImg" src="assets/bg.png" alt="" />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileUserImg" src="/profile.jpg" alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">TinBear</h4>
              <Button href="/profile/edit" className="profileInfoDesc">
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="profileRightBottom">{/* <Feed /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
