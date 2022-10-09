import React from "react";
import { Container, Navbar, Form, Button, Modal, Nav } from "react-bootstrap";
import * as icon from "react-icons/fa";
import styles from "./NavBar.module.css";
import "./NavBar.css";
import { useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc } from "firebase/firestore";
import SearchBar from "./SearchBar/SearchBar";
import BookData from "./Data.json";

const NavBar2 = () => {
  const [DisplayName, setDisplayName] = useState("");
  const [ProfPic, setProfPic] = useState("");

  auth.onAuthStateChanged((user) => {
    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);
    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //WELCOME USER
            setDisplayName(doc.data().Display_Name);
            setProfPic(doc.data().Profile_Picture);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });
  const [smShow, setSmShow] = useState(false);
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container className={styles.navbarWrapper} fluid>
        <Navbar.Brand href="/home">
          <img className={styles.logo} alt="logo" src="/Logo.png" />
        </Navbar.Brand>
        <Nav className={styles.SearchbarWrapper}>
          <SearchBar placeholder="Enter a Book Name..." data={BookData} />
        </Nav>
        <Nav className={styles.buttons}>
          <Button
            variant="transparent"
            onClick={() => setSmShow(true)}
            className="me-2"
          >
            <icon.FaBell href="/" className={styles.notifbell} />
          </Button>
          <Modal show={smShow} onHide={() => setSmShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Small Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>...</Modal.Body>
          </Modal>
          <Navbar.Brand href="/profile" className={styles.displayName}>
            Welcome {DisplayName}
          </Navbar.Brand>
          <img className={styles.profile} alt="" src={ProfPic} />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar2;
