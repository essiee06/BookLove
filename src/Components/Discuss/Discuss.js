import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import styles from "./Discuss.module.css";
import Feed from "../Feed/Feed";
import { Container } from "react-bootstrap";

const Discuss = (Slug) => {
  // const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const dataslug = Slug["data"];
  const welcome_message = Slug["wm"];
  let navigate = useNavigate();

  const createPost = async () => {
  
    var today = new Date();
    const millis = today.getTime();
    const date = (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '  ' + today.getHours() + ':' + today.getMinutes());
    
    await getDoc(doc(db, "Book_Club_Information", dataslug)).then((docSnap) => {
      if (docSnap.exists()) {
        addDoc(collection(db, "Book_Club_Information", dataslug, "Posts"), {
          AuthorName: auth.currentUser.displayName, 
          AuthorId: auth.currentUser.uid, 
          AuthorPhoto: auth.currentUser.photoURL,
          Post: postText,
          BookClub_Name: docSnap.data().BookClub_Name,
          BookClub_Picture: docSnap.data().BookClub_Picture,
          BookClub_Slug: docSnap.data().BookClub_Slug,
          Date_Posted: date,
          No_Of_Likes: 0,
        }).then(() =>{
        addDoc(collection(db, "Users_Information", auth.currentUser.uid, "Posts"), {
          AuthorName: auth.currentUser.displayName, 
          AuthorId: auth.currentUser.uid, 
          AuthorPhoto: auth.currentUser.photoURL,
          Post: postText,
          BookClub_Name: docSnap.data().BookClub_Name,
          BookClub_Picture: docSnap.data().BookClub_Picture,
          BookClub_Slug: docSnap.data().BookClub_Slug,
          Date_Posted: date,
          No_Of_Likes: 0,
        })
      });
    }
    }).then(() =>{
      navigate("/home");
    })
  }

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className={styles.createPostPage}>
      <Container fluid className={styles.WelcomeMessage}>
        {welcome_message}
      </Container>
      <div className={styles.cpContainer}>
        {/* <h1>Share your thoughts...</h1> */}
        {/* <div className={styles.inputGp}>
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => setTitle(event.target.value)}
          />
        </div> */}
        <div className={styles.inputGp}>
          {/* <label>Post:</label> */}
          <textarea
            className={styles.textbox}
            placeholder="Share your thoughts..."
            onChange={(event) => setPostText(event.target.value)}
          />
          <button className={styles.btnpost} onClick={createPost}>
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
