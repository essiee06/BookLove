import React from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import * as icon from "react-icons/fa";
import styles from "./NavBar.module.css";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container className={styles.navbarWrapper} fluid>
        <Navbar.Brand href="/home">
          <img className={styles.logo} alt="logo" src="Logo.png" />
        </Navbar.Brand>
        <Form className="search-box">
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
          <Button className="search-icon" variant="transparent">
            <icon.FaSearch />
          </Button>
        </Form>
        <icon.FaBell href="/" className={styles.notifbell} />
        <Navbar.Brand href="/profile">
          <span className={styles.displayName}>Welcome TinBear!</span>
        </Navbar.Brand>
        <img className={styles.profile} alt="" src="/profile.jpg" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
