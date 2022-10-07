import React from "react";
import { Container } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";

import { auth } from "../../Components/firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";

const Home = () => {
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
      <Feed />
    </div>
  );
};

export default Home;
