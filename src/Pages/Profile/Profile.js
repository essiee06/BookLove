import React from "react";
import { Button, Figure, Stack } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";
import "./profile.css";
import { useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import styles from "./Profile.module.css";

const Profile = () => {
  console.log(auth.currentUser);
  let navigate = useNavigate();

  const [DisplayName, setDisplayName] = useState("");

  auth.onAuthStateChanged((user) => {
    // commented out lang sa para di maglisod ug check pero included jud ni siya
    // if(auth.currentUser==null){
    //   navigate("/");
    // }

    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //DISPLAY NAME
            setDisplayName(doc.data().Display_Name);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });
  return (
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
                src="/profile.jpg"
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
    </div>
  );
};

export default Profile;
