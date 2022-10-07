import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./BrowseClubs.module.css";
import { auth, db } from "../../Components/firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import { getDocs, collection, query, orderBy, startAfter, limit, doc } from "firebase/firestore";


const BrowseClubs = () => {
  let navigate = useNavigate();
  const colRef = collection(db, "Book_Club_Information");
  const docsSnap = getDocs(colRef);
  const [bookClubName, setbookClubName] = useState(null);
  const [bookClubDesc, setbookClubDesc] = useState(null);

 

  useEffect(() => {
    getDocs(colRef).then((snapshot) =>{
      snapshot.docs.forEach(doc =>{
        setbookClubName(doc.data().BookClub_Name);
        console.log(bookClubName);
      })
    });
  }, []);

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
