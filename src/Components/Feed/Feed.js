import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Feed.module.css";
import "./Feed.css";
const Feed = () => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "post");
  const [, setIsAuth] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPost();
  });

  // const signOutuser = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     setIsAuth(false);
  //     navigate("/login");
  //   });
  // };

  const deletePost = async (id) => {
    const postDoc = doc(db, "post", id);
    await deleteDoc(postDoc);
  };

  return (
    <div>
      <Container className={styles.feed}>
        <Container className={styles.feedContainer}>
          <div className="homePage">
            {postList.map((post) => {
              return (
                <div className="post">
                  <div className="postHeader">
                    <div className="title">
                      <h1>{post.title}</h1>
                    </div>
                    <div className="deletePost">
                      <button
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        &#128465;
                      </button>
                    </div>
                  </div>
                  <div className="postTextContainer">{post.postText}</div>
                  <h3>@(Anonymous)</h3>
                </div>
              );
            })}
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Feed;
