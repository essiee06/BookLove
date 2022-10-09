import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
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
      setPostList(data.docs.map((doc) => ({ ...doc.data(), name: doc.name })));
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
      <div className={styles.feed}>
        <div className={styles.feedContainer}>
          <div className={styles.homePage}>
            {postList.map((post) => {
              return (
                <div className={styles.post}>
                  <div className={styles.postHeader}>
                    <div className={styles.title}>
                      <h1>{post.title}</h1>
                    </div>
                    <div className={styles.deletePost}>
                      <button
                        onClick={() => {
                          deletePost(post.name);
                        }}
                      >
                        &#128465;
                      </button>
                    </div>
                  </div>
                  <div className={styles.postTextContainer}>
                    {post.postText}
                  </div>
                  <h4>@{post.author.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
