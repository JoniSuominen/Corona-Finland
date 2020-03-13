import React from "react";
import Map from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class App extends React.Component {
  render() {
    return (
      <Container fluid style={{paddingRight:"0px", paddingLeft: "0px"}}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="">Korona-tartunnat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Kartta</Nav.Link>
              <Nav.Link href="#pricing">Tartunnat</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Map></Map>
      </Container>
    );
  }
}

export default App;
