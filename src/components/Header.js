import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand href="/overview">
              <img
                src="smart-room-logo-white.svg"
                width="50"
                height="50"
                className="img-logo"
              ></img>
              SmartRoom
            </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/overview">Overview</Nav.Link>
              <Nav.Link href="/devices">All Devices</Nav.Link>
              <Nav.Link href="/login">
                <i className="fas fa-user"></i> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
