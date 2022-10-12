import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import styles from "./CreateNewPost.module.css";
import ClubFeed from "../ClubFeed/ClubFeed";
import { Container, Figure, Stack } from "react-bootstrap";
import { Avatar } from "@mui/material";
import * as icon from "react-icons/fa";

const CreateNewPost = (Slug) => {
  // const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const dataslug = Slug["data"];
  const welcome_message = Slug["wm"];
  let navigate = useNavigate();

  const createPost = async () => {
    var today = new Date();
    const millis = today.getTime().toString();
    console.log(millis);
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "  " +
      today.getHours() +
      ":" +
      today.getMinutes();

    await getDoc(doc(db, "Book_Club_Information", dataslug))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setDoc(doc(db, "Book_Club_Information", dataslug, "Posts", millis), {
            AuthorName: auth.currentUser.displayName,
            AuthorId: auth.currentUser.uid,
            AuthorPhoto: auth.currentUser.photoURL,
            Post: postText,
            BookClub_Name: docSnap.data().BookClub_Name,
            BookClub_Picture: docSnap.data().BookClub_Picture,
            BookClub_Slug: docSnap.data().BookClub_Slug,
            Date_Posted: date,
          }).then(() => {
            setDoc(
              doc(
                db,
                "Users_Information",
                auth.currentUser.uid,
                "Posts",
                millis
              ),
              {
                AuthorName: auth.currentUser.displayName,
                AuthorId: auth.currentUser.uid,
                AuthorPhoto: auth.currentUser.photoURL,
                Post: postText,
                BookClub_Name: docSnap.data().BookClub_Name,
                BookClub_Picture: docSnap.data().BookClub_Picture,
                BookClub_Slug: docSnap.data().BookClub_Slug,
                Date_Posted: date,
              }
            );
          });
        }
      })
      .then(() => {
        navigate("/home");
      });
  };

  const [ProfPic, setProfPic] = useState(null);
  auth.onAuthStateChanged((user) => {
    var userUid = auth.currentUser.uid;
    var docRef = doc(db, "Users_Information", userUid);

    if (auth.currentUser == null) {
      navigate("/");
    }

    if (user) {
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
            //DISPLAY NAME & PROFILE PICTURE
            setProfPic(doc.data().Profile_Picture);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className={styles.welcomeContainer}>
      <div fluid className={styles.WelcomeMessage}>
        {welcome_message}
      </div>
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
          <Stack direction="horizontal" gap={5}>
            <Figure>
              <Avatar
                className={styles.profileUserImg}
                sx={{ width: 60, height: 60 }}
                src={ProfPic}
              />
              <textarea
                className={styles.textbox}
                placeholder="Share your thoughts..."
                onChange={(event) => setPostText(event.target.value)}
              />
              {/* <button className={styles.btnpost} onClick={createPost}> */}
              <icon.FaPencilAlt
                className={styles.btnpost}
                onClick={createPost}
              />
              {/* </button> */}
            </Figure>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
