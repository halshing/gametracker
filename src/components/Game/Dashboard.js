import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AvailableTeams from "./AvailableTeams";

const styles = {
  root: {
    flex: 1
  }
};

const Dashboard = props => {
  const { data } = props;
  const { Teams, StartTime, EndTime } = data;
  return (
    <Grid container spacing={0}>
      <Grid>
        <AvailableTeams {...props} />
      </Grid>
    </Grid>
  )
};

export default withStyles(styles)(Dashboard);
