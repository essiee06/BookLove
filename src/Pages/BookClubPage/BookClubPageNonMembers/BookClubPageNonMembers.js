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
import { doc, setDoc, getDoc } from "firebase/firestore";

const BookClubPageNonMembers = () => {

  let navigate = useNavigate();

  const { bookClubSlug } = useParams();
  const [bookClub, setbookClub] = useState(null);
  const [AboutClub, setAboutClub] = useState(null);
  
  useEffect(() => {
    bookClubSlug && getClubDetail();
    if(auth.currentUser==null){
      navigate("/");
    }
  }, bookClubSlug)

    //navigates the user back to the login page if not logged in


  const getClubDetail = async () => {
    auth.onAuthStateChanged((user) => {
      const docRef = doc(db, "Book_Club_Information", bookClubSlug);
      const memRef = doc(db, "Book_Club_Information", bookClubSlug, "Members", auth.currentUser.uid);

      getDoc(memRef).then(memSnap => {
        if(memSnap.exists()) {
          var joinbtn = document.getElementById("joinclub");
          joinbtn.style.setProperty("display", "none");
          console.log("User is a member");
        }
      });

      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          setbookClub(docSnap.data());
          setAboutClub(docSnap.data().BookClub_Description);
        }
      });
    });
  }

  return (
    <Container>
      <NavBar />
      <Sidebar />
      <Container>
        <img className={styles.profileCoverImg} src="assets/bg.png" alt="" />
        <div>
          <Button href="/mybookclubs" variant="transparent">
            <FaArrowLeft className={styles.backArow} />
          </Button>
        </div>
        <div>
          <Stack direction="horizontal" gap={3}>
            <Figure className={styles.clubImg}>
              <Figure.Image
                width={151}
                height={160}
                alt="171x180"
                src="/profile.jpg"
                roundedCircle="true"
              />
            </Figure>
            <label className={styles.clubName}>{bookClub?.BookClub_Name}</label>
          </Stack>
        </div>
        <div>
          <Button className={styles.JoinBtn} variant="danger" size="lg" id="joinclub">
            Join Club
          </Button>
        </div>

        <div>
          <label className={styles.hostedby}>Hosted by</label>
        </div>
        <div>
          <Stack className={styles.hosted} direction="horizontal" gap={3}>
            <Figure className={styles.hostedimg}>
              <Figure.Image
                width={50}
                height={50}
                alt="171x180"
                src="/profile.jpg"
                roundedCircle="true"
              />
              <label className={styles.hostedname}>{bookClub?.Owner_Name}</label>
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
            <Tab eventKey="home" title="Discuss" >
              <Discuss />
            </Tab>
            <Tab eventKey="profile" title="About">
              <About data={AboutClub}/>
            </Tab>
            <Tab eventKey="longer-tab" title="Members">
              <Members />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </Container>
  );
};

export default BookClubPageNonMembers;
