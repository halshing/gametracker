import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flex: 1
  },
  btnJoinTeam: {
    fontWeight: "bold"
  },
  iconJoinTeam: {
    padding: "5px"
  },
  pointTotalLabel: {
    fontWeight: "bold"
  },
  pointTotalValue: {
    fontSize: "18px",
    fontWeight: "bold"
  }
};

const getPointTotal = team =>
  Object.keys(team).reduce((total, player) => {
    total += team[player];
    return total;
  }, 0);

const TeamMembers = team => {
  return Object.keys(team).map((name, index) => (
    <TableRow key={index}>
      <TableCell>{name}</TableCell>
      <TableCell>{team[name]}</TableCell>
    </TableRow>
  ));
};

const TeamCard = props => {
  const { classes, team, index, openDialog, Status } = props;
  return <Card className={classes.card}>
      <CardContent>
        <Table padding="dense">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TeamMembers(team)}
            <TableRow>
              <TableCell className={classes.pointTotalLabel}>Total:</TableCell>
              <TableCell className={classes.pointTotalValue}>
                {getPointTotal(team)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      {Status === "Open" && <CardActions>
          <Button className={classes.btnJoinTeam} onClick={() => {
              openDialog(index);
            }}>
            <Icon color="primary" fontSize="large" className={classes.iconJoinTeam}>
              add_circle
            </Icon>
            Join Team
          </Button>
        </CardActions>}
    </Card>;
};

export default withStyles(styles)(TeamCard);
