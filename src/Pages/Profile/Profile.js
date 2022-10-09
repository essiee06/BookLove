import React from "react";
import { Button, Figure, Stack } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";
import "./profile.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import styles from "./Profile.module.css";
import Splash from "../../Components/Splash/Splash";

const Profile = () => {
  console.log(auth.currentUser);
  let navigate = useNavigate();

  //splash
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [DisplayName, setDisplayName] = useState("");
  const [ProfPic, setProfPic] = useState(null);

  auth.onAuthStateChanged((user) => {

    //navigates the user back to the login page if not logged in
    if(auth.currentUser==null){
      navigate("/");
    }

    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //DISPLAY NAME & PROFILE PICTURE
            setDisplayName(doc.data().Display_Name);
            setProfPic(doc.data().Profile_Picture);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });
  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
    <div>
      <NavBar />
      <div className={styles.ProfileWrapper}>
        <Sidebar />
        <img className={styles.profileCoverImg} src="assets/bg.png" alt="" />
        <div className={styles.profileInfo}>
          <Stack direction="vertical" gap={3}>
            <Figure>
              <Figure.Image
                className={styles.profileUserImg}
                alt="171x180"
                src={ProfPic}
                roundedCircle="true"
              />
            </Figure>
            <label className={styles.profileInfoName}>{DisplayName}</label>
          </Stack>
          <Button
            id="EditProfile"
            href="/profile/edit"
            className={styles.profileInfoDesc}
          >
            Edit Profile
          </Button>
          <div className={styles.Postwrapper}>
            <span>My Posts</span>
          </div>
        </div>
        <div className={styles.Postline}></div>
      </div>
    </div>)}
    </div>
  );
};

export default Profile;
