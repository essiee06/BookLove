import React from "react";
import { Button, Container, Figure, Form, Stack } from "react-bootstrap";
import NavBar from "../../Components/NavBar/NavBar";
import Sidebar from "../../Components/Sidebar";
import { FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {
  return (
    <div>
      {" "}
      <NavBar />
      <Sidebar />
      <Container>
        <div>
          <FaArrowLeft />
        </div>
        <div>Edit Profile</div>
        <div>
          <label>Display Name</label>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              placeholder="Add your item here..."
            />
            <Button variant="danger">Update Display Name</Button>
          </Stack>
        </div>
        <div>
          <Stack direction="vertical" gap={3}>
            <label>New Password</label>
            <Form.Control
              className="me-auto"
              placeholder="Add your item here..."
            />
            <label>Change Password</label>
            <Form.Control
              className="me-auto"
              placeholder="Add your item here..."
            />
            <Button variant="danger">Change Password</Button>
          </Stack>
        </div>
        <div>
          <h2>Display Name</h2>
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
