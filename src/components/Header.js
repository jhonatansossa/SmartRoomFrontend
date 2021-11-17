import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand href="/">SmartRoom</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/overview">
                          Overview
                        </Nav.Link>
                        <Nav.Link href="/devices">
                            All Devices
                        </Nav.Link>
                        <Nav.Link href="/detailed">
                            Detailed
                        </Nav.Link>
                        <Nav.Link href="/login"><i className='fas fa-user'></i>Sign In</Nav.Link>        
                    </Nav>
                </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
    
}

export default Header
