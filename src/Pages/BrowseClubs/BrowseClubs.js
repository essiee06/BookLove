import React from "react";
import { Button, Container } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./BrowseClubs.module.css";
import { auth } from "../../Components/firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import MiniClubDetailContainer from "../../Components/MiniClubDetailContainer/MiniClubDetailContainer";

const BrowseClubs = () => {
  let navigate = useNavigate();

  // commented out lang sa para di maglisod ug check pero included jud ni siya
  // auth.onAuthStateChanged((user) =>{
  //   if(!auth.currentUser){
  //     navigate("/");
  //   }
  // });

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div className={styles.BrowseClubswrapper}>
          <span>Browse Clubs</span>
      </div>
      <div className={styles.BrowseClubsline}>
      </div>
      <MiniClubDetailContainer />
    </div>
  );
};

export default BrowseClubs;
