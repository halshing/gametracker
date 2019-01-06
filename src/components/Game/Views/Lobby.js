import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dashboard from "../Dashboard";
import AvailableTeams from "../AvailableTeams";

const styles = {
  root: {
    flex: 1,
    height: "100vh",
    padding: "20px"
  }
};

const ViewContainer = props => {
  const { data } = props;

  switch (data.Status) {
    case "Open":
      return <AvailableTeams {...props} />;
    default:
      return <Dashboard {...props} />;
  }
};

const Lobby = props => {
  const { loading, classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs>
          <div>
            {!loading ? <ViewContainer {...props} /> : <div>Loading...</div>}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Lobby);
