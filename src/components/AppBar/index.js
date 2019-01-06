import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar as AppHeader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import NewGameDialog from "./NewGameDialog";

const styles = {
  homeLink: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  backArrow: {
    verticalAlign: "text-top",
    marginRight: "10px"
  }
};

const HomeLink = ({ classes, location }) => (
  <Link to="/" className={classes.homeLink}>
    <Typography variant="h6" color="inherit">
      {(location.pathname !== "/" && (
        <div>
          <Icon className={classes.backArrow}>arrow_back</Icon>
          Back
        </div>
      )) || <div>Game Tracker 2019!</div>}
    </Typography>
  </Link>
);

class AppBarMain extends Component {
  state = {
    dialogOpen: false
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return (
      <div>
        <AppHeader position="static">
          <Toolbar>
            <HomeLink {...this.props} />
            {this.props.location.pathname === "/" && (
              <Button color="inherit" onClick={this.openDialog}>
                New Game
              </Button>
            )}
            <NewGameDialog
              isOpen={this.state.dialogOpen}
              handleClose={this.closeDialog}
              history={this.props.history}
            />
          </Toolbar>
        </AppHeader>
      </div>
    );
  }
}

const AppBar = withRouter(AppBarMain);

export default withStyles(styles)(AppBar);
