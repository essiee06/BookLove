import React from "react";
import {
  Button,
  Container,
  Figure,
  Form,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import NavBar from "../../../Components/NavBar/NavBar";
import Sidebar from "../../../Components/Sidebar";
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
                width={171}
                height={180}
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
        <Stack direction="vertical" gap={2}>
          <label className={styles.AboutClub}>About this Club</label>
          <div className={styles.ClubDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </Stack>
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
          <div className={styles.groupTabs}>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="home" title="Discuss" disabled>
                hello
              </Tab>
              <Tab eventKey="profile" title="About">
                hello
              </Tab>
              <Tab eventKey="longer-tab" title="Members" disabled>
                hello
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default BookClubPageNonMembers;
