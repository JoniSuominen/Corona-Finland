import React from "react";
import Map from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SimpleGraph from "./components/SimpleGraph";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Container fluid style={{ paddingRight: "0px", paddingLeft: "0px" }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Korona-tartunnat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Kartta</Nav.Link>
              <Nav.Link href="graph">Tartunnat</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Router>
          <Switch>
            <Route path="/graph">
              <SimpleGraph></SimpleGraph>
            </Route>
            <Route path="/">
              <Map></Map>
            </Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
