import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../Components/firebase";
import { addDoc, collection } from "firebase/firestore";
import "./BookClubs.css";
import styles from "./BookClubs.module.css";
import Sidebar from "../../Components/SideBar/SideBar";

const BookClubs = () => {
  // commented out lang sa para di maglisod ug check pero included jud ni siya
  // if(auth.currentUser==null){
  //   navigate("/");
  // }

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
      <NavBar />
      <Sidebar />
      {/* <div className="">
        <div className="createPostPage">
          <div className="cpContainer">
            <h1>Create A Post</h1>
            <div className="inputGp">
              <label>Title:</label>
              <input
                placeholder="Title..."
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="inputGp">
              <label>Post:</label>
              <textarea
                className="textbox"
                placeholder="Post..."
                onChange={(event) => setPostText(event.target.value)}
              />
              <button onClick={createPost}>Submit Post</button>
            </div>
          </div>
        </div>
      </div> */}

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
        <div className={styles.clubWrapper2}>
          <Stack direction="horizontal" gap={3}>
            <Button
              className={styles.createbtn}
              href="/create"
              variant="danger"
            >
              Create a Club
            </Button>
            <Button className={styles.joinbtn} href="/browse" variant="danger">
              Join a Club
            </Button>
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default BookClubs;
