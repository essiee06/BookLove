import React from "react";
import { Button, Container } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import styles from "./BrowseClubs.module.css";

const BrowseClubs = () => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <Container>
        <div className={styles.clubWrapper1}>
          <Button
            className={styles.viewbtn}
            href="/bookclubname"
            variant="danger"
          >
            View Club
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default BrowseClubs;
