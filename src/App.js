import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";

import GraphPage from "./pages/GraphPage";
import MapPage from "./pages/MapPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouterLink
} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = theme => ({
  root: {
    marginTop: 15,
    width: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container maxWidth="xl">
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography >
                <Button href="/" color="inherit" style={{height: "100%"}}>
                  Kartta
                </Button>
                <Button href="/graph" color="inherit" style={{height: "100%"}}>
                  Tilastot
                </Button>
              </Typography>
            </Toolbar>
          </AppBar>
          <Router>
            <Switch>
              <Route path="/graph">
                <GraphPage />
              </Route>
              <Route path="/">
                <MapPage></MapPage>
              </Route>
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(App);
