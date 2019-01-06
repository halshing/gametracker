import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const defaultState = { username: "", description: "", rounds: 1, valid: false };

const isValidUsername = str => !str.match(/[^a-zA-Z0-9_-]/);

const styles = {
  roundsField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  fieldTitle: {
    display: "flex",
    justifyContent: "center"
  },
  btnAdd: {
    display: "flex",
    color: "blue",
    padding: "0 15px",
    fontSize: "50px"
  },
  btnMinus: {
    display: "flex",
    color: "red",
    padding: "0 15px",
    fontSize: "50px"
  },
  roundsValue: { fontSize: "80px" },
  divider: { margin: "30px 0" }
};

const RoundsField = ({ value, classes, updateCount }) => {
  return (
    <div className={classes.roundsField}>
      <Button onClick={() => updateCount(value - 1)}>
        <Icon className={classes.btnMinus}>remove</Icon>
      </Button>
      <div className={classes.roundsValue}>{value}</div>
      <Button onClick={() => updateCount(value + 1)}>
        <Icon className={classes.btnAdd}>add</Icon>
      </Button>
    </div>
  );
};

class NewGameDialogMain extends Component {
  state = { ...defaultState };

  createNewGame = async () => {
    let game = await this.props.firebase.createGame(this.state);
    this.handleClose();
    this.props.history.push(`/game/${game.id}`);
  };

  handleClose = () => {
    this.setState({ ...defaultState });
    this.props.handleClose();
  };

  handleUsernameChange = e => {
    let username = e.target.value;

    if (!isValidUsername(username)) {
      username = username.replace(/[^a-zA-Z0-9_-]/, "");
    }

    if (username.length < 3) {
      this.setState({ valid: false, username });
    } else {
      this.setState({ username });
    }
  };

  handleUsernameBlur = e => {
    let username = e.target.value;
    if (isValidUsername(username) && username.length > 2 && username.trim()) {
      this.setState({ username, valid: true });
    } else {
      this.setState({ username: "", valid: false });
    }
  };

  handleDescriptionBlur = e => {
    let description = e.target.value;
    if (description.trim()) {
      this.setState({ description });
    } else {
      this.setState({ description: "" });
    }
  };

  updateCount = count => this.setState({ rounds: count || 1 });

  render() {
    const { username, rounds, valid } = this.state;
    const { isOpen, classes } = this.props;
    return (
      <Dialog open={isOpen} onClose={this.handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-title">Create A New Game</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.fieldTitle}>
            Ready Player? Select a Name
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            value={username}
            onChange={this.handleUsernameChange}
            onBlur={this.handleUsernameBlur}
          />
          <Divider variant="middle" className={classes.divider} />
          <DialogContentText className={classes.fieldTitle}>
            How many rounds do you want to play?
          </DialogContentText>
          <RoundsField
            value={rounds}
            classes={classes}
            updateCount={this.updateCount}
          />
          <Divider variant="middle" className={classes.divider} />
          <DialogContentText className={classes.fieldTitle}>
            Give your game a tag line (optional)
          </DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            id="description"
            label="Description"
            type="text"
            variant="outlined"
            onBlur={this.handleDescriptionBlur}
          />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={this.createNewGame}
            disabled={!valid}
            variant="contained"
          >
            Create Game!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const NewGameDialog = withFirebase(NewGameDialogMain);

export default withStyles(styles)(NewGameDialog);
