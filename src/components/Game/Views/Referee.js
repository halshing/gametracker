import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const styles = {
  root: {
    flex: 1,
    height: "100%"
  },
  container: { height: "100%", textAlign: "center" },
  btnAction: {
    flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  btnSkip: {
    height: "100%",
    width: "100%",
    fontSize: "3em",
    backgroundColor: "orange"
  },
  btnCorrect: {
    height: "100%",
    width: "100%",
    fontSize: "3em",
    backgroundColor: "green"
  },
  btnPhraseText: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "default"
  },
  phraseText: {
    fontSize: "6vw"
  },
  btnNextPlayer: {
    margin: "20px",
    backgroundColor: "pink"
  },
  btnRound: {
    margin: "20px",
    backgroundColor: "lightblue"
  },
  btnEndGame: { margin: "20px", backgroundColor: "red" }
};

const StartGameButton = ({ startGame }) => (
  <Button
    color="primary"
    variant="contained"
    style={{ fontWeight: "bold", backgroundColor: "#4caf50" }}
    onClick={startGame}
  >
    <Icon style={{ paddingRight: "10px" }} fontSize="large">
      play_circle_filled
    </Icon>
    Start Game!
  </Button>
);

const ActiveRound = ({ classes, data, updatePlayerScore }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid
        item
        className={classes.btnAction}
        onClick={() => {
          console.log("skipped");
        }}
      >
        <Button className={classes.btnSkip}>Skip</Button>
      </Grid>
      <Grid item className={classes.btnPhraseText}>
        <div className={classes.phraseText}>Spice Girls</div>
      </Grid>
      <Grid
        item
        className={classes.btnAction}
        onClick={() => {
          updatePlayerScore();
        }}
      >
        <Button className={classes.btnCorrect}>Correct</Button>
      </Grid>
    </Grid>
  );
};

const GameRoundButton = props => {
  let { classes, Active, Round, MaxRounds, nextRound, endRound } = props;

  let method = Active ? endRound : nextRound;
  let btnText = Active ? `End Round ${Round + 1}` : `Start Round ${Round + 2}`;

  return (
    <Button variant="contained" onClick={method} className={classes.btnRound}>
      {btnText}
    </Button>
  );
};

const ActiveGame = props => {
  const { classes, data, nextPlayer, nextRound, endRound } = props;
  const { GameTracker, Teams, MaxRounds } = data;
  const { Team, Active, Round } = GameTracker;
  return (
    <Grid container spacing={0} style={{ height: "100%" }}>
      <Grid item xs={10}>
        {Active ? (
          <ActiveRound {...props} />
        ) : (
          <div>Waiting to start Round {Round + 2}...</div>
        )}
      </Grid>
      <Grid item xs={2}>
        <GameRoundButton
          classes={classes}
          Active={Active}
          Round={Round}
          MaxRounds={MaxRounds}
          nextRound={nextRound}
          endRound={endRound}
        />
        <Button
          variant="contained"
          className={classes.btnNextPlayer}
          onClick={() => nextPlayer()}
          disabled={!Active || Team === Teams.length - 1}
        >
          Next Player
        </Button>
        <Button variant="contained" className={classes.btnEndGame}>
          End Game
        </Button>
      </Grid>
    </Grid>
  );
};

const DoneGame = () => {
  return (
    <Grid container spacing={0} style={{ height: "100%" }}>
      <Grid item>The game is over! Please create a new game.</Grid>
    </Grid>
  );
};

const ViewContainer = props => {
  const { data, startGame } = props;

  switch (data.Status) {
    case "Open":
      return <StartGameButton startGame={startGame} />;
    case "In Progress":
      return <ActiveGame {...props} />;
    default:
      return <DoneGame />
  }
};

class RefereeView extends Component {
  state = {};
  render() {
    const { loading, classes } = this.props;
    return (
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs>
          {!loading ? <ViewContainer {...this.props} /> : <div>loading...</div>}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(RefereeView);
