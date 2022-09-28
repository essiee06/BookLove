import React from "react";
import { Container } from "react-bootstrap";
import Feed from "../../Components/Feed/Feed";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import SideBar from "../../Components/SideBar/SideBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <Feed />
    </div>
  );
};

export default Home;
