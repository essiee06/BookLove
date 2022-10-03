import React from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import * as icon from "react-icons/fa";
import styles from "./NavBar.module.css";
import "./NavBar.css";
import { useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc } from "firebase/firestore";

const NavBar = () => {

  const [DisplayName, setDisplayName] = useState("");

  auth.onAuthStateChanged((user) =>{
    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);
    console.log(user.displayName);
    if(user){
      getDoc(docRef).then((doc) => {
        if (doc.exists) {
          //WELCOME USER
          setDisplayName(doc.data().Display_Name);
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  });

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container className={styles.navbarWrapper} fluid>
        <Navbar.Brand href="/home">
          <img className={styles.logo} alt="logo" src="Logo.png" />
        </Navbar.Brand>
        <div className={styles.searchwrapper}>
          <Form className="search-box">
            <Form.Control
              id="search-bar"
              type="search"
              placeholder="Search"
              className="me-2 align-top "
              aria-label="Search"
            />
            {/* <Link to="/search" ClassName="search-icon"> 
            <icon.FaSearch/>
            </Link> */}
            <Button className="search-icon" variant="transparent">
              <icon.FaSearch />
            </Button>
          </Form>
        </div>

        <icon.FaBell href="/" className={styles.notifbell} />
        <Navbar.Brand href="/profile">
          <span className={styles.displayName}>Welcome {DisplayName}!</span>
        </Navbar.Brand>
        <img className={styles.profile} alt="" src="/profile.jpg" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
