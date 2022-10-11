import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import styles from "./Discuss.module.css";
import Feed from "../Feed/Feed";
import { Container } from "react-bootstrap";

const Discuss = (Slug) => {
  // const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "post");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      // title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/home");
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className={styles.createPostPage}>
      <Container fluid className={styles.WelcomeMessage}>
        {" "}
        Welcome
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

      <Container fluid className={styles.FeedWrapper}>
        <Feed />
      </Container>
    </div>
  );
};

export default Discuss;
