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
import { Button, Figure, Card, Stack } from "react-bootstrap";
import * as icon from "react-icons/fa";
import { Avatar } from "@mui/material";
import Like from "../Like/Like";
import moment from "moment";
import Avatarbg from "./NoClubs.png";

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
  if (postList.length == 0) {
    return (
      <div className={styles.feed}>
        <div className={styles.feedContainer}>
          <div className={styles.homePage1}>
            <Card className="cardcontainer">
              <Card.Body>
                <Card.Subtitle>
                  <Avatar src={Avatarbg} sx={{ width: 100, height: 100 }} />
                </Card.Subtitle>
                <Card.Title>
                  <h2 className="clubnameh2"> There are no posts yet. </h2>
                </Card.Title>
                <Card.Text className="clubdesc">
                  {" "}
                  Go to one of your book clubs and create your very first post!{" "}
                </Card.Text>
                <div>
                  <Link to={`/mybookclubs`}>
                    <Button id="ViewClub" className="CreateClubbuttonlabel">
                      View My Book Clubs
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
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
                    {post.AuthorId == useruid ? (
                      <div className={styles.deletePost}>
                        {/* <icon.FaHeart className={styles.icon} /> */}
                        {/* <icon.FaCommentAlt className={styles.icon} /> */}

                        <button
                          onClick={() => {
                            deletePost(
                              post.id,
                              post.BookClub_Slug,
                              post.AuthorId
                            );
                          }}
                        >
                          <icon.FaTrashAlt />
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {/* <div className={styles.deletePost}>
                      <button
                        onClick={() => {
                          deletePost(post.id, post.BookClub_Slug, post.AuthorId);
                        }}
                      >
                        <icon.FaTrashAlt />
                      </button> */}
                    {/* </div> 
                      :
                    <div></div>
                    }  */}
                    {/* <Like postid={post.id} useruid={auth.currentUser.uid} clubslug={post.BookClub_Slug}/> */}
                    {/* </div>
                    ) : (
                        <div></div>
                      )} */}
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
  }
};

export default Feed;
