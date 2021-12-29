import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {useLocation} from "react-router-dom";

const Header = () => {
    var location = useLocation()

  if(location.pathname !== "/login" && location.pathname !== "/404" && location.pathname !== "/" ){
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
                  />
                  SmartRoom
                </Navbar.Brand>
                <Nav className="ml-auto">
                  <Nav.Link href="/overview">Overview</Nav.Link>
                  <Nav.Link href="/devices">All Devices</Nav.Link>
                  <Nav.Link href="/switches">All Switches</Nav.Link>
                  <Nav.Link href="/login">
                    <i className="fas fa-user"/> Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    );
  }else{
    return(
        <div/>
    );
  }

};

export default Header;
