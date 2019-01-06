import React, { Component } from "react";
// import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";

const defaultState = {
  valid: false,
  username: ""
};

const isValidUsername = str => !str.match(/[^a-zA-Z0-9_-]/);

class AddPlayerDialog extends Component {
  state = { ...defaultState };

  handleSave = () => {
    this.props.methods.saveDialog(this.state.username);
    this.handleClose();
  };

  handleUsernameChange = e => {
    let username = e.target.value;

    if (!isValidUsername(username)) {
      username = username.replace(/[^a-zA-Z0-9_-]/, "");
    }

    if (username.length < 3) {
      this.setState({ valid: false, username });
    } else {
      this.setState({ valid: true, username });
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

  handleClose = () => {
    this.setState({ ...defaultState });
    this.props.methods.closeDialog();
  };

  render() {
    const { isOpen, methods } = this.props;
    const { username, valid } = this.state;

    return (
      <Dialog open={isOpen}>
        <DialogTitle>Join Team</DialogTitle>
        <DialogContent>
          <DialogContentText>Ready Player? Select a Name</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={methods.closeDialog}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.handleSave()}
            disabled={!valid}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddPlayerDialog;
