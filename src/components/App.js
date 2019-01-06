import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withFirebase } from "../components/Firebase";
import AppBar from "./AppBar";
import Home from "./Home";
import Game from "./Game";

const styles = theme => ({
  root: {
    flex: 1,
    height: "calc(100% - 64px)"
  },
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  }
});

const AppMain = props => {
  const { classes } = props;
  return (
    <Router>
      <div className={classes.root}>
        <AppBar />
        <Switch>
          <Route exact path="/" render={nav => <Home {...props} {...nav} />} />
          <Route path="/game/:gameId" render={nav => <Game {...props} {...nav} />} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

const App = withFirebase(AppMain);

export default withStyles(styles)(App);
