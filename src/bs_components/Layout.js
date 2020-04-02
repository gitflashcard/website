import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav';
//import NavDropdown from 'react-bootstrap/NavDropdown';
//import Flashcards from "./Flashcards";
import FlippyFlashcards from "./FlippyFlashcards";

class Layout extends React.Component {
    navbar_style = {
        position: "static",
        top: 0,
        right: 0,
        left: 0,
    };

    content = {
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
    }

    /*
    <Navbar style={this.navbar_style} collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">FlashcardGo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">More deets</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Dank memes
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
     */

    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <Container style={{ maxWidth:"100%", justifyContent: "center", margin:"0 auto", padding:"0px" }}>
                    <Navbar style={this.navbar_style} collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">FlashcardGo</Navbar.Brand>
                    </Navbar>
                    <Container style={this.content}>
                        <FlippyFlashcards />
                        {children}
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}

export default Layout;
