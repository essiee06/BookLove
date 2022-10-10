import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import CreateClubs from "../../Pages/CreateClub/CreateClubs";
import EditClub from "../EditClub/EditClub";
import styles from "./Manage.module.css";

const Manage = () => {
  return (
    <Container className={styles.EditClubWrapper}>
      <div className={styles.EditClub}>
        <Stack gap={4}>
          <label className={styles.editclubtxt}>Edit Club Details</label>
          <label className={styles.editclubdesc}>
            Edit your Club Name, Club Icon, and Club Description here.
          </label>
        </Stack>
        <Button
          className={styles.Editbtn}
          href="/clubpage/edit"
          variant="danger"
        >
          Edit Club Details
        </Button>
      </div>
      {/* <div>
        <EditClub />
      </div> */}
    </Container>
  );
};

export default Manage;
