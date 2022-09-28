import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../Components/firebase";
import { addDoc, collection } from "firebase/firestore";
import "./BookClubs.css";

const BookClubs = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState();
  const [postText, setPostText] = useState();
  const [, setIsAuth] = useState(false);

  const postCollectionRef = collection(db, "post");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate("/home");
  };

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
      <div className="">
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
      </div>
    </div>
  );
};

export default BookClubs;
