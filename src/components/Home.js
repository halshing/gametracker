import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const styles = {
  root: {
    flex: 1,
    padding: "10px"
  },
  statusHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingBottom: "10px"
  },
  column: {
    padding: "0 10px"
  },
  gameCard: {
    marginBottom: "20px",
    cursor: "pointer"
  },
  gameProp: {
    fontWeight: "bold"
  },
  gameID: {},
  gameDescription: {
    fontSize: "0.9em"
  }
};

const formatDate = value => {
  value = new Date(value);
  let date = value.toDateString();
  let time = `${value.getHours() % 12 || 12}:${value.getMinutes()}`;
  let shift = value.getHours() > 12 ? "PM" : "AM";
  return `${date} at ${time} ${shift}`;
};

const StatusColumn = ({ games, classes, goToGame }) => {
  return (
    <Grid container direction="column">
      {games.map(game => (
        <Grid key={game.GameID} item xs>
          <GameCard game={game} classes={classes} goToGame={goToGame} />
        </Grid>
      ))}
    </Grid>
  );
};

const GameCard = ({ game, classes, goToGame }) => {
  return (
    <Card className={classes.gameCard} onClick={() => goToGame(game.GameID)}>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={classes.gameProp}>Game Info</TableCell>
              <TableCell>
                <div className={classes.gameID}>ID: {game.GameID}</div>
                <div className={classes.gameDescription}>
                  {game.Description}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.gameProp}>Owner</TableCell>
              <TableCell>{game.Owner}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.gameProp}>Max Rounds</TableCell>
              <TableCell>{game.MaxRounds}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.gameProp}>Teams</TableCell>
              <TableCell>{game.Teams.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.gameProp}>Start Time</TableCell>
              <TableCell>
                {game.StartTime ? formatDate(game.StartTime) : "--"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.gameProp}>End Time</TableCell>
              <TableCell>
                {game.EndTime ? formatDate(game.EndTime) : "--"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

class Home extends Component {
  state = { OpenGames: [], ActiveGames: [], DoneGames: [] };
  async componentDidMount() {
    let open = await this.props.firebase.getGamesByStatus("Open");
    let active = await this.props.firebase.getGamesByStatus("In Progress");
    let done = await this.props.firebase.getGamesByStatus("Done");
    this.setState({
      OpenGames: open,
      ActiveGames: active,
      DoneGames: done
    });
  }

  goToGame = id => this.props.history.push(`/game/${id}`);

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Grid container className={classes.root}>
        <Grid item xs className={classes.column}>
          <div className={classes.statusHeader}>Open Games</div>
          <StatusColumn
            games={this.state.OpenGames}
            status={"Open"}
            classes={classes}
            goToGame={this.goToGame}
          />
        </Grid>
        <Grid item xs className={classes.column}>
          <div className={classes.statusHeader}>In Progress Games</div>
          <StatusColumn
            games={this.state.ActiveGames}
            status={"In Progress"}
            classes={classes}
            goToGame={this.goToGame}
          />
        </Grid>
        <Grid item xs className={classes.column}>
          <div className={classes.statusHeader}>Done Games</div>
          <StatusColumn
            games={this.state.DoneGames}
            status={"Done"}
            classes={classes}
            goToGame={this.goToGame}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
