import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from "react-router-dom";
import { setIsUserAdminCallback } from "../screens/Login/Login";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedIsAdmin = sessionStorage.getItem("isAdmin") === "true";
    setIsAdmin(storedIsAdmin);

    const handleIsUserAdminChange = (newIsUserAdmin) => {
      console.log("Is Admin:", newIsUserAdmin);
      setIsAdmin(newIsUserAdmin);
    };

    setIsUserAdminCallback(handleIsUserAdminChange);
  }, []);

  if(location.pathname !== "/login" && location.pathname !== "/404" && location.pathname !== "/" ){
    return (
        <header>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer to="/overview">
            <Navbar.Brand>
                  <img
                      src="smart-room-logo-white.svg"
                      width="50"
                      height="50"
                      className="img-logo"
                  />
                  SmartRoom
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="ml-auto">
                  <LinkContainer to='/overview'>
                    <Nav.Link >Overview</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/devices'>
                    <Nav.Link>All Devices</Nav.Link>
                  </LinkContainer>                  
                  <LinkContainer to='/switches'>
                    <Nav.Link>All Switches</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/control'>
                    <Nav.Link>Control Panel</Nav.Link>
                  </LinkContainer>

                  { isAdmin && (
                  <LinkContainer to="/userAccountCreation">
                    <Nav.Link>Create User</Nav.Link>
                  </LinkContainer>
                )}

                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className="fas fa-user"/> Logout
                    </Nav.Link>
                  </LinkContainer>
                  
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
