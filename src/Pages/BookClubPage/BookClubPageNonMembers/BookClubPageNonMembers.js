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
import Sidebar from "../../../Components/SideBar/Sidebar";
import styles from "./BookClubPageNonMembers.module.css";

const BookClubPageNonMembers = () => {
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
            <label className={styles.clubName}>Book Club</label>
          </Stack>
        </div>
        <div>
          <Button className={styles.JoinBtn} variant="danger" size="lg">
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
              <label className={styles.hostedname}>Book Club</label>
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
            <Tab eventKey="home" title="Discuss" disabled>
              <Discuss />
            </Tab>
            <Tab eventKey="profile" title="About">
              <About />
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
