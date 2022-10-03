import React from "react";
import { Button } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import "./profile.css";
import { useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  console.log(auth.currentUser);
  let navigate = useNavigate();

  const [DisplayName, setDisplayName] = useState("");
  
  auth.onAuthStateChanged((user) =>{

    // commented out lang sa para di maglisod ug check pero included jud ni siya
    // if(auth.currentUser==null){
    //   navigate("/");
    // }

    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if(user){
      getDoc(docRef).then((doc) => {
        if (doc.exists) {
          //DISPLAY NAME
          setDisplayName(doc.data().Display_Name);
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  });
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
              <h4 className="profileInfoName">{DisplayName}</h4>
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
