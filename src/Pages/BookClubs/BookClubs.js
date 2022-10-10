import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../Components/firebase";
import { addDoc, collection } from "firebase/firestore";
import "./BookClubs.css";
import styles from "./BookClubs.module.css";
import Sidebar from "../../Components/SideBar/SideBar";
import MiniClubDetailMyClubs from "../../Components/MiniClubDetailContainer/MiniClubDetailMyClubs";

import Splash from "../../Components/Splash/Splash";

const BookClubs = () => {

  let navigate = useNavigate();

  //splash
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //navigates the user back to the login page if not logged in
  if(auth.currentUser==null){
    navigate("/");
  }

  // let navigate = useNavigate();
  // const [title, setTitle] = useState();
  // const [postText, setPostText] = useState();
  // const [, setIsAuth] = useState(false);

  // const postCollectionRef = collection(db, "post");

  // const createPost = async () => {
  //   await addDoc(postCollectionRef, {
  //     title,
  //     postText,
  //     author: {
  //       name: auth.currentUser.displayName,
  //       id: auth.currentUser.uid,
  //     },
  //   });

  //   navigate("/home");
  // };

  // const signOutuser = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     setIsAuth(false);
  //     navigate("/login");
  //   });
  // };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
    <div>
       <div className={styles.MyClubswrapper}>
          <span>My Book Clubs</span>
      </div>
      <div className={styles.MyClubsline}>
      </div>
      <NavBar />
      <Sidebar />
      <MiniClubDetailMyClubs />
    </div>
    )}
    </div>
  );
};

export default BookClubs;
