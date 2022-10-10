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
import Members from "../../../Components/Members/Members";
import NavBar from "../../../Components/NavBar/NavBar";
import Sidebar from "../../../Components/SideBar/SideBar";
import styles from "./BookClubPageNonMembers.module.css";
import { auth, db } from "../../../Components/firebase";
import Splash from "../../../Components/Splash/Splash";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";

const BookClubPageNonMembers = () => {
  let navigate = useNavigate();

  const { bookClubSlug } = useParams();
  const [bookClub, setbookClub] = useState(null);
  const [AboutClub, setAboutClub] = useState(null);
  const [clubpic, setclubPic] = useState(null);
  const [ownerpic, setownerPic] = useState(null);
  const [member, setMember] = useState(true);
  const [userName, setuserName] = useState("");
  const [userUid, setuserUid] = useState("");
  const [userPic, setuserPic] = useState("");

  //splash

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    bookClubSlug && getClubDetail() && joinClub();
  }, bookClubSlug);

  //navigates the user back to the login page if not logged in

  const getClubDetail = async () => {
    auth.onAuthStateChanged((user) => {
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
        auth.currentUser.uid
      );

      getDoc(memRef).then((memSnap) => {
        if (memSnap.exists()) {
          var joinbtn = document.getElementById("joinclub");
          joinbtn.style.setProperty("display", "none");
          setMember(false);
        } else {
          var leavebtn = document.getElementById("leaveclub");
          leavebtn.style.setProperty("display", "none");
        }
      });

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setbookClub(docSnap.data());
          setAboutClub(docSnap.data().BookClub_Description);
          setclubPic(docSnap.data().BookClub_Picture);
          setownerPic(docSnap.data().Owner_Picture);
        }
      });
    });
  };

  const joinClub = async (e) => {
    e.preventDefault();
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
        window.alert("You have successfuly joined the club");
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  const leaveClub = async (e) => {
    e.preventDefault();
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
            <Sidebar />
            <Container>
              <img
                className={styles.profileCoverImg}
                src="assets/bg.png"
                alt=""
              />
              <div>
                <Button href="/mybookclubs" variant="transparent">
                  <FaArrowLeft className={styles.backArow} />
                </Button>
              </div>
              <div className={styles.clubDetails}>
                <Stack direction="horizontal" gap={3}>
                  <Avatar
                    className={styles.clubimg}
                    sx={{ width: 120, height: 120, right: 350, top: 250 }}
                    style={{ position: "absolute" }}
                    src={clubpic}
                  />
                </Stack>
              </div>
              <div>
                <Button
                  className={styles.JoinBtn}
                  variant="danger"
                  size="lg"
                  id="joinclub"
                  onClick={joinClub}
                >
                  Join Club
                </Button>
                <Button
                  className={styles.JoinBtn}
                  variant="danger"
                  size="lg"
                  id="leaveclub"
                  onClick={leaveClub}
                >
                  Leave Club
                </Button>
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
              <div className={styles.groupTabs}>
                <Tabs
                  defaultActiveKey="profile"
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="discuss" title="Discuss" disabled={member}>
                    <Discuss />
                  </Tab>
                  <Tab eventKey="about" title="About">
                    <About data={AboutClub} />
                  </Tab>
                  <Tab eventKey="members" title="Members" disabled={member}>
                    <Members />
                  </Tab>
                  <Tab eventKey="manage" title="Manage">
                    <Manage />
                  </Tab>
                </Tabs>
              </div>
            </Container>
          </Container>
        </div>
      )}
    </div>
  );
};

export default BookClubPageNonMembers;
