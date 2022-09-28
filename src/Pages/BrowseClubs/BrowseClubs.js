import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";

const BrowseClubs = () => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <div>Browse</div>
    </div>
  );
};

export default BrowseClubs;
