import React from "react";
import { Container, Figure, Stack } from "react-bootstrap";
import styles from "./Members.module.css";
const Members = () => {
  return (
    <div>
      <Container fluid>
        <Stack direction="vertical" gap={2}>
          <label className={styles.listMembersTxt}>List of Members</label>
          <Stack className={styles.members} direction="horizontal" gap={3}>
            <Figure className={styles.membersimg}>
              <Figure.Image
                width={65}
                height={65}
                alt="171x180"
                src="/profile.jpg"
                roundedCircle="true"
              />
              <label className={styles.membersname}>Book Club</label>
            </Figure>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Members;
