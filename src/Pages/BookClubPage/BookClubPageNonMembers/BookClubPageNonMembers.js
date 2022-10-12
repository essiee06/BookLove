import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Figure,
  Form,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import About from "../../../Components/About/About";
import Discuss from "../../../Components/Discuss/Discuss";
import CreateNewPost from "../../../Components/CreateNewPost/CreateNewPost";
import Manage from "../../../Components/Manage/Manage";
import NavBar from "../../../Components/NavBar/NavBar";
import Sidebar from "../../../Components/SideBar/SideBar";
import styles from "./BookClubPageNonMembers.module.css";
import { auth, db } from "../../../Components/firebase";
import Splash from "../../../Components/Splash/Splash";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Card from "react-bootstrap/Card";
import "./BookClubPageNonMembers.module.css";
import { maxHeight } from "@mui/system";
import Feed from "../../../Components/Feed/Feed";

const BookClubPageNonMembers = () => {
  let navigate = useNavigate();

  const { bookClubSlug } = useParams();
  const [bookClub, setbookClub] = useState(null);
  const [bookClubName, setbookClubName] = useState(null);
  const [AboutClub, setAboutClub] = useState(null);
  const [WelcomeMessage, setWelcomeMessage] = useState(null);
  const [clubpic, setclubPic] = useState(null);
  const [ownerpic, setownerPic] = useState(null);
  const [owneruid, setownerUid] = useState(null);
  const [member, setMember] = useState(false);
  const [userName, setuserName] = useState("");
  const [userUid, setuserUid] = useState("");
  const [userPic, setuserPic] = useState("");
  const [clubmembers, setbookClubs] = useState("");
  const [currentowner, setCurrentOwner] = useState(false);
  const [ClubSlug, setClubSlug] = useState(null);

  //splash

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    bookClubSlug && getClubDetail();
  }, bookClubSlug);

  const getClubDetail = async () => {
    auth.onAuthStateChanged((user) => {
      //navigates the user back to the login page if not logged in
      if (auth.currentUser == null) {
        navigate("/");
      }

      setuserName(user.displayName);
      setuserUid(user.uid);
      setuserPic(user.photoURL);

      const docRef = doc(db, "Book_Club_Information", bookClubSlug);
      const memRef = doc(
        db,
        "Book_Club_Information",
        bookClubSlug,
        "Members",
        user.uid
      );
      const memlist = collection(
        db,
        "Book_Club_Information",
        bookClubSlug,
        "Members"
      );

      getDoc(memRef).then((memSnap) => {
        if (memSnap.exists()) {
          // var joinbtn = document.getElementById("joinclub");
          // joinbtn.style.display = "none";
          setMember(true);
        }
      });

      getDocs(memlist).then((snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setbookClubs(list);
      });

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setbookClub(docSnap.data());
          setbookClubName(docSnap.data().BookClub_Name);
          setAboutClub(docSnap.data().BookClub_Description);
          setclubPic(docSnap.data().BookClub_Picture);
          setownerPic(docSnap.data().Owner_Picture);
          setownerUid(docSnap.data().Owner_Uid);
          setWelcomeMessage(docSnap.data().Welcome_Message);
          setClubSlug(docSnap.data().BookClub_Slug);
        }
      });
    });

    if(owneruid==auth.currentUser){
      setCurrentOwner(true);
    }
  };

  const joinClub = () => {
    // e.preventDefault();
    setDoc(
      doc(
        db,
        "Book_Club_Information",
        bookClubSlug,
        "Members",
        auth.currentUser.uid
      ),
      {
        Member_Name: userName,
        Member_Uid: userUid,
        Member_Picture: userPic,
      }
    )
      .then(() => {
        setDoc(
          doc(
            db,
            "Users_Information",
            auth.currentUser.uid,
            "My_Book_Clubs",
            bookClubSlug
          ),
          {
            BookClub_Name: bookClubName,
            BookClub_Description: AboutClub,
            BookClub_Slug: bookClubSlug,
            BookClub_Picture: clubpic,
          }
        );
      })
      .then(() => {
        window.alert("You have successfuly joined the club");
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  const leaveClub = () => {
    // e.preventDefault();
    deleteDoc(
      doc(
        db,
        "Book_Club_Information",
        bookClubSlug,
        "Members",
        auth.currentUser.uid
      )
    )
      .then(() => {
        deleteDoc(
          doc(
            db,
            "Users_Information",
            auth.currentUser.uid,
            "My_Book_Clubs",
            bookClubSlug
          )
        );
      })
      .then(() => {
        window.alert("You have left the club");
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
        <div>
          <Container>
            <NavBar />
            <Sidebar />{" "}
            <img
              className={styles.profileCoverImg}
              src="/assets/bg3.jpg"
              alt=""
            />
            <div className={styles.wrapperClubInfo}>
              <Stack direction="horizontal" gap={3}>
                <Avatar
                  className={styles.clubimg}
                  sx={{ width: 150, height: 150, top: 0 }}
                  style={{
                    position: "absolute",
                    display: "flex",
                  }}
                  src={clubpic}
                />
                {/* , right: 350, top: 250 */}
                <div className={styles.clubnameWrapper}>
                  <label
                    className={styles.clubName}
                    style={{ backdropFilter: "none" }}
                  >
                    {bookClub?.BookClub_Name}
                  </label>
                </div>
              </Stack>
            </div>
            <div>
              {member ? (
                <Button
                  className={styles.JoinBtn}
                  variant="danger"
                  size="lg"
                  id="leaveclub"
                  onClick={leaveClub}
                >
                  Leave Club
                </Button>
              ) : (
                <Button
                  className={styles.JoinBtn}
                  variant="danger"
                  size="lg"
                  id="joinclub"
                  onClick={joinClub}
                >
                  Join Club
                </Button>
              )}
            </div>
            <div>
              <label className={styles.hostedby}>Hosted by</label>
            </div>
            <div>
              <Stack className={styles.hosted} direction="horizontal" gap={3}>
                <Figure className={styles.hostedimg}>
                  <Avatar
                    className={styles.profileUserImg}
                    sx={{ width: 50, height: 50, right: 135, top: 15 }}
                    style={{ position: "absolute" }}
                    src={ownerpic}
                  />
                  <label className={styles.hostedname}>
                    {bookClub?.Owner_Name}
                  </label>
                </Figure>
              </Stack>
            </div>
            <Container>
              <div className={styles.groupTabs}>
                {member ? (
                  <Tabs
                    defaultActiveKey="discuss"
                    id="justify-tab-example"
                    className="mb-4"
                    justify
                  >
                    <Tab eventKey="discuss" title="Discuss">
                      <Discuss data={bookClubSlug} wm={WelcomeMessage}/>
                    </Tab>
                    <Tab eventKey="createpost" title="Post">
                      <CreateNewPost data={bookClubSlug} wm={WelcomeMessage}/>
                    </Tab>
                    {/* <Tab
                      className={styles.FeedWrapper}
                      eventKey="feed"
                      title="Post"
                    >
                      <Feed />
                    </Tab> */}
                    <Tab eventKey="about" title="About">
                      <About data={AboutClub} />
                    </Tab>
                    <Tab eventKey="longer-tab" title="Members">
                      <div className={styles.clubmembersdiv}>
                        <label className={styles.listMembersTxt}>
                          List of Members
                        </label>
                        <div className={styles.miniclubdetailDiv}>
                          <Stack direction="vertical" gap={5}>
                            {clubmembers.map((clubmembers) => {
                              return (
                                <Card className={styles.membercard}>
                                  <Card.Body>
                                    <Card.Subtitle>
                                      <Avatar
                                        src={clubmembers.Member_Picture}
                                        sx={{ width: 100, height: 100 }}
                                      />
                                    </Card.Subtitle>
                                    <Card.Title>
                                      <h2 className={styles.membernameh2}>
                                        {clubmembers.Member_Name}
                                      </h2>
                                    </Card.Title>
                                  </Card.Body>
                                </Card>
                              );
                            })}
                          </Stack>
                        </div>
                      </div>
                    </Tab>
                    {currentowner ?
                    <Tab eventKey="manage" title="Manage">
                      <Manage data={ClubSlug}/>
                    </Tab>
                    :
                    <div></div>
                    }
                  </Tabs>
                ) : (
                  <Tabs
                    defaultActiveKey="about"
                    id="justify-tab-example"
                    className="mb-4"
                    justify
                  >
                    <Tab eventKey="discuss" title="Discuss" disabled>
                      <Discuss />
                    </Tab>
                    <Tab eventKey="feed" title="Post" disabled>
                      <Feed />
                    </Tab>
                    <Tab eventKey="about" title="About">
                      <About data={AboutClub} />
                    </Tab>
                    <Tab eventKey="member" title="Members" disabled>
                      <div>
                        <label className={styles.listMembersTxt}>
                          List of Members
                        </label>
                      </div>
                    </Tab>
                  </Tabs>
                )}
              </div>
            </Container>
          </Container>
        </div>
      )}
    </div>
  );
};

export default BookClubPageNonMembers;
