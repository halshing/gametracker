import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import ViewsPanel from "./ViewsPanel";
import GameDetailsPanel from "./GameDetailsPanel";
import Lobby from "./Views/Lobby";
import PlayerView from "./Views/Player";
import RefereeView from "./Views/Referee";
import ViewerView from "./Views/Viewer";
import AddPlayerDialog from "./AddPlayerDialog";

const styles = {
  root: {
    flex: 1,
    height: "calc(100% - 20px)",
    paddingTop: "10px"
  }
};

const GameArena = ({ url, game, methods }) => {
  return (
    <Switch>
      <Route
        path={`${url}/player`}
        render={props => <PlayerView {...game} {...methods} />}
      />
      <Route
        path={`${url}/referee`}
        render={props => <RefereeView {...game} {...methods} />}
      />
      <Route
        path={`${url}/viewer`}
        render={props => <ViewerView {...game} {...methods} />}
      />
      <Route render={props => <Lobby {...game} {...methods} />} />
    </Switch>
  );
};

class GameMain extends Component {
  state = { loading: true, data: {}, newPlayerDialogOpen: false };

  async componentDidMount() {
    let game = await this.props.firebase.getGameById(
      this.props.match.params.gameId
    );
    if (game.exists) {
      this.setState({
        loading: false,
        data: { ...game.data(), GameID: game.id }
      });
    }
    this.props.firebase.getGameRef().onSnapshot(
      snap => {
        this.setState({
          data: { ...snap.data(), GameID: snap.id }
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  methods = {
    openDialog: index => {
      this.setState({
        newPlayerDialogOpen: true,
        selectedTeam:
          typeof index === "number" && index === 0 ? index : index || -1
      });
    },
    closeDialog: () => {
      this.setState({ newPlayerDialogOpen: false, selectedTeam: -1 });
    },
    saveDialog: async username => {
      await this.props.firebase.addPlayer(username, this.state.selectedTeam);
      this.setState({ newPlayerDialogOpen: false, selectedTeam: -1 });
    },
    startGame: async () => {
      this.props.firebase.startGame();
    },
    updatePlayerScore: async () => {
      await this.props.firebase.updatePlayerScore(this.state.data.GameTracker);
    },
    nextPlayer: async () => {
      await this.props.firebase.nextPlayer();
    },
    nextRound: async () => {
      await this.props.firebase.nextRound();
    },
    endRound: async () => {
      await this.props.firebase.endRound();
    }
  };

  render() {
    const {
      classes,
      match: { url }
    } = this.props;
    const { data, newPlayerDialogOpen } = this.state;
    return (
      <div className={classes.root}>
        <Zoom in style={{ height: "100%" }}>
          <Grid container spacing={0}>
            <Grid item xs={3} style={{ height: "100%" }}>
              <div>
                <ViewsPanel />
                <GameDetailsPanel data={data} />
              </div>
            </Grid>
            <Grid item xs={9} style={{ height: "100%" }}>
              <GameArena
                url={url}
                game={{ ...this.state }}
                methods={this.methods}
              />
            </Grid>
          </Grid>
        </Zoom>
        <AddPlayerDialog isOpen={newPlayerDialogOpen} methods={this.methods} />
      </div>
    );
  }
}

export default withStyles(styles)(GameMain);
