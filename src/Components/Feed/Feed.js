import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Feed.module.css";
import "./Feed.css";
import { Figure, Stack } from "react-bootstrap";
import * as icon from "react-icons/fa";
import { Avatar } from "@mui/material";

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

  const [ProfPic, setProfPic] = useState(null);
  var userUid = auth.currentUser.uid;
  var docRef = doc(db, "Users_Information", userUid);
  getDoc(docRef).then((doc) => {
    if (doc.exists) {
      //DISPLAY NAME & PROFILE PICTURE
      setProfPic(doc.data().Profile_Picture);
    }
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
                    <Stack direction="horizontal" gap={5}>
                      <Figure className={styles.ProfileImg}>
                        {/* <Figure.Image
                          width={50}
                          height={50}
                          alt="171x180"
                          src="/profile.jpg"
                          roundedCircle="true"
                          className={styles.ProfileImg}
                        /> */}
                        <Avatar
                          className={styles.profileUserImg}
                          sx={{ width: 60, height: 60 }}
                          src={ProfPic}
                        />
                        <label className={styles.displayName}>
                          @{post.author.name}
                        </label>
                      </Figure>
                      <Figure className={styles.BookCLubimg}>
                        <Figure.Image
                          width={50}
                          height={50}
                          alt="171x180"
                          src="/profile.jpg"
                          roundedCircle="true"
                        />
                        <label className={styles.BookClubname}>
                          BookbClub
                          {/* {bookClub?.Owner_Name} */}
                        </label>
                      </Figure>
                    </Stack>
                  </div>

                  <div className={styles.postTextContainer}>
                    {post.postText}
                  </div>
                  <div className={styles.deletePost}>
                    <icon.FaHeart className={styles.icon} />
                    <icon.FaCommentAlt className={styles.icon} />
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      <icon.FaTrashAlt />
                    </button>
                  </div>
                  <hr />
                  <div>
                    <Stack direction="horizontal">
                      <Figure.Image
                        width={50}
                        height={50}
                        alt="171x180"
                        src="/profile.jpg"
                        roundedCircle="true"
                      />
                      <textarea
                        className={styles.commentbox}
                        placeholder="Share your thoughts..."
                      />
                      <button className={styles.btnpost}>
                        <icon.FaPaperPlane />
                      </button>
                    </Stack>
                  </div>
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
