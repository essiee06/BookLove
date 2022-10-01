import React from "react";
import { Button, Container, Figure, Form, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  return (
    <div>
      {" "}
      <NavBar />
      <Sidebar />
      <Container>
        <div>
          <Button href="/mybookclubs" variant="transparent">
            <FaArrowLeft className={styles.backArow} />
          </Button>
        </div>
        <div className={styles.editProfilewrapper}>
          <span className={styles.editProfileTxt}>Edit Profile</span>
        </div>
        <div className={styles.editDisplayName}>
          <label className>Display Name</label>
          <Stack direction="horizontal" gap={3}>
            <Form.Control className="me-auto" placeholder="" />
            <Button variant="danger">Update Display Name</Button>
          </Stack>
        </div>
        <div className={styles.editPassword}>
          <Stack direction="vertical" gap={2}>
            <label>New Password</label>
            <Form.Control className="me-auto" placeholder="" />
            <label>Change Password</label>
            <Form.Control className="me-auto" placeholder="" />
            <Button variant="danger">Change Password</Button>
          </Stack>
        </div>
        <div className={styles.EditProfilePic}>
          <Stack direction="vertical" gap={3}>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="/profile.jpg"
                roundedCircle="true"
              />
            </Figure>
            <Button variant="danger">Change Picture</Button>
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default EditProfile;
