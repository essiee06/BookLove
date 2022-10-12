import React from "react";
import { Stack } from "react-bootstrap";
import styles from "./About.module.css";

const About = (about) => {
  return (
    <div className={styles.AboutWrapper}>
      <Stack direction="vertical" gap={2}>
        <label className={styles.AboutClub}>About this Club</label>
        <div className={styles.ClubDescription}>
          <p className={styles.ClubDescriptiontext}>{about.data}</p>
        </div>
      </Stack>
    </div>
  );
};

export default About;
