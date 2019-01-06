import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const styles = {
  root: {
    flex: 1
  },
  header: {
    textAlign: "center"
  },
  label: {},
  value: {}
};

const GameDetailsPanel = ({ data, classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.header}>Game Tracker</div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.label}>Round</TableCell>
            <TableCell className={classes.value}>
              {data.Status === "In Progress" ?
                data.GameTracker &&
                data.GameTracker.Round + 1 : "--"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.label}>Team</TableCell>
            <TableCell className={classes.value}>
              {data.Status === "In Progress" ?
                data.GameTracker &&
                data.GameTracker.Team + 1 : "--"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.label}>Player</TableCell>
            <TableCell className={classes.value}>
              {data.Status === "In Progress" ?
                data.GameTracker &&
                data.GameTracker.Player : "--"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      ;
    </div>
  );
};

export default withStyles(styles)(GameDetailsPanel);
