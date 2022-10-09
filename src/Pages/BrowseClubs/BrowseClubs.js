import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./BrowseClubs.module.css";
import { auth, db } from "../../Components/firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBar";
import MiniClubDetailContainer from "../../Components/MiniClubDetailContainer/MiniClubDetailContainer";
import { getDocs, collection, query, orderBy, startAfter, limit, doc } from "firebase/firestore";


const BrowseClubs = () => {
  let navigate = useNavigate();
  const colRef = collection(db, "Book_Club_Information");
  const docsSnap = getDocs(colRef);
  const [bookClubName, setbookClubName] = useState(null);
  const [bookClubDesc, setbookClubDesc] = useState(null);
  const [bookClubs, setbookClubs] = useState([]);

  //START GROUP CODE A NGA MUWORK
//  const getClubs = async () => {
//   getDocs(colRef).then((snapshot) =>{
//     let list = [];
//     snapshot.docs.forEach(doc =>{
//       list.push({ id: doc.id, ...doc.data() });
//     })
//     setbookClubs(list);
//   })
  
//  }

//  console.log(bookClubs);
//  useEffect(() =>{
//   getClubs();
//  }, []);
// END SA GROUP CODE A NGA MUWORK

//START SA GROUP CODE B NGA MUWORK
  useEffect(() => {
    getDocs(colRef).then((snapshot) =>{
      let list = [];
      snapshot.docs.forEach(doc =>{
        list.push({ id: doc.id, ...doc.data() });
      })
      setbookClubs(list);
    });
  }, []);

  const results =[];

  bookClubs.forEach(club =>{
    results.push(
      <MiniClubDetailContainer key={club.id} clubs={club}/>  
    )
  })
//END SA GROUP CODE B NGA MUWORK

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

      {/* GROUP CODE A */}
      {/* {bookClubs.map((clubs) =>
        <MiniClubDetailContainer clubs = {clubs} />
      )} */}
      
      
      {/* GROUP CODE B */}
      {results}

    </div>
  );
};

export default BrowseClubs;
