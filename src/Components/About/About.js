import React from "react";
import { Stack } from "react-bootstrap";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.AboutWrapper}>
      <Stack direction="vertical" gap={2}>
        <label className={styles.AboutClub}>About this Club</label>
        <div className={styles.ClubDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </Stack>
    </div>
  );
};

export default About;
