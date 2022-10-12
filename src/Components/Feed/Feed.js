import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Feed.module.css";
import "./Feed.css";
import { Figure, Stack } from "react-bootstrap";
import * as icon from "react-icons/fa";
import { Avatar } from "@mui/material";
import Like from "../Like/Like";
import moment from "moment";
const Feed = (uid) => {
  const [postList, setPostList] = useState([]);
  const [bookClubs, setbookClubs] = useState([]);
  const [, setIsAuth] = useState(false);
  let navigate = useNavigate();
  const useruid = uid["data"];

  useEffect(() => {
    const getPost = async () => {
      const Clubdata = await getDocs(
        collection(db, "Users_Information", useruid, "My_Book_Clubs")
      );
      let clublist = [];
      let postlist = [];

      Clubdata.forEach((doc) => {
        clublist.push({ id: doc.id });

        const docid = doc.id;
        const postCollectionRef = collection(
          db,
          "Book_Club_Information",
          docid,
          "Posts"
        );
        const Postdata = getDocs(postCollectionRef);
        Postdata.then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            postlist.push({ id: doc.id, ...doc.data() });
          });
          setPostList(postlist);
        });
      });
      setbookClubs(clublist);
    };

    getPost();
  });

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

  const deletePost = async (id, slug, userid) => {
    const postDocClub = doc(db, "Book_Club_Information", slug, "Posts", id);
    const postDocUser = doc(db, "Users_Information", userid, "Posts", id);
    await deleteDoc(postDocClub);
    await deleteDoc(postDocUser);
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
                    <Stack direction="horizontal" gap={4}>
                      <Figure className={styles.ProfileImg}>
                        <Avatar
                          className={styles.profileUserImg}
                          sx={{ width: 80, height: 80 }}
                          src={post.AuthorPhoto}
                        />
                        <Stack gap={0} direction="vertical">
                          <label className={styles.displayName}>
                            {post.AuthorName}
                          </label>
                          <label className={styles.datePosted}>
                            {moment(post.Date_Posted).calendar()}
                          </label>
                        </Stack>
                      </Figure>
                      <Figure className={styles.BookCLubimg}>
                        <Stack direction="horizontal">
                          <Link to={`/${post.BookClub_Slug}`}>
                            <label className={styles.BookClubname}>
                              {post.BookClub_Name}
                            </label>
                          </Link>
                          <Avatar
                            className={styles.profileUserImg}
                            sx={{ width: 80, height: 80 }}
                            src={post.BookClub_Picture}
                          />
                        </Stack>
                      </Figure>
                    </Stack>
                  </div>

                  <div className={styles.postTextContainer}>{post.Post}</div>
                  <div className={styles.deletePost}>
                    <button
                      onClick={() => {
                        deletePost(post.id, post.BookClub_Slug, post.AuthorId);
                      }}
                    >
                      <icon.FaTrashAlt />
                    </button>
                    {/* </div> 
                    :
                   <div></div>
                  }  */}
                    {/* <Like postid={post.id} useruid={auth.currentUser.uid} clubslug={post.BookClub_Slug}/> */}
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
