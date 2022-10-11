import React, { useEffect } from "react";
import { Container, Navbar, Form, Button, Modal, Nav } from "react-bootstrap";
import * as icon from "react-icons/fa";
import styles from "./NavBar.module.css";
// import "./NavBar.css";
import { useState } from "react";
import { auth, db } from "../../Components/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import SearchBar from "./SearchBar/SearchBar";
import Avatar from "@mui/material/Avatar";

const NavBar = () => {
  const [DisplayName, setDisplayName] = useState("");
  const [ProfPic, setProfPic] = useState(null);
  const searchRef = collection(db, "Book_Club_Information");
  const [searchclubs, setsearch] = useState([]);

  useEffect(() => {
    getDocs(searchRef).then((snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setsearch(list);
    });
  }, []);

  console.log(searchclubs);
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

  return (
    <Navbar bg="light" expand="lg" fixed="top" className={styles.NavBarWrapper}>
      <Navbar.Brand href="/home" className={styles.logowrapper}>
        <img className={styles.logo} alt="logo" href="/home" src="/Logo.png" />
      </Navbar.Brand>
      <Container fluid>
        <SearchBar
          // className={styles.SearchbarWrapper}
          placeholder="Enter a Book Club..."
          data={searchclubs}
        />
      </Container>

      <Navbar.Brand href="/profile" className={styles.displayName}>
        Welcome {DisplayName}!
        <div className={styles.profile} alt="">
          <Avatar src={ProfPic} sx={{ width: 80, height: 80 }} />
        </div>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
