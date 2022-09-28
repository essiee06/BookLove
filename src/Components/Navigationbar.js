import React from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
// import { Link } from 'react-router-dom'
import * as icon from "react-icons/fa";

const Navigationbar = () => {
  return (
    <Navbar id="navbar" bg="#FA9494" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/home">
          <img className="logo" alt="" src="Logo.png" height={100} />
        </Navbar.Brand>

        <Form className="d-flex">
          <Form.Control
            id="search-bar"
            type="search"
            placeholder="Search"
            className="me-2 align-top "
            aria-label="Search"
          />
          {/* <Link to="/search" ClassName="search-icon"> 
            <icon.FaSearch/>
            </Link> */}
          <Button className="search-icon" variant="light">
            <icon.FaSearch />
          </Button>
        </Form>
        <Button className="notif-bell" variant="light">
          <icon.FaRegBell />
        </Button>
        <Navbar.Brand href="/profile">
          <span className="display-name">Welcome TinBear!</span>
        </Navbar.Brand>
        <Button
          className="display-profile"
          href="/profile"
          variant="outline-success"
        ></Button>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
