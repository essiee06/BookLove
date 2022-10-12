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
                    <Stack direction="horizontal" gap={4}>
                      <Figure className={styles.ProfileImg}>
                        <Avatar
                          className={styles.profileUserImg}
                          sx={{ width: 80, height: 80 }}
                          src={post.AuthorPhoto}
                        />
                        <Stack gap={0} direction="vertical">
                          <label className={styles.displayName}>
                            @{post.AuthorName}
                          </label>
                          <label className={styles.datePosted}>
                            {post.Date_Posted}
                          </label>
                        </Stack>
                      </Figure>
                      <Figure className={styles.BookCLubimg}>
                        <Link to={`/bookclub/${post.BookClub_Slug}`}>
                          <label className={styles.BookClubname}>
                            {post.BookClub_Name}
                          </label>
                        </Link>
                        <Figure.Image
                          width={80}
                          height={80}
                          alt="171x180"
                          src={post.BookClub_Picture}
                          roundedCircle="true"
                        />
                      </Figure>
                    </Stack>
                  </div>

                  <div className={styles.postTextContainer}>{post.Post}</div>
                  <div className={styles.deletePost}>
                    {/* <icon.FaHeart className={styles.icon} /> */}
                    {/* <icon.FaCommentAlt className={styles.icon} /> */}
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      <icon.FaTrashAlt />
                    </button>
                    {/* <Like postid={post.id} useruid={auth.currentUser.uid} clubslug={post.BookClub_Slug}/> */}
                  </div>
                  {/* <div>
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
                  </div> */}
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
