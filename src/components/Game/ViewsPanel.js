import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
  container: {
    width: "100%",
    flexShrink: 0
  },
  listItem: {
    padding: "40px"
  }
};

const ViewIcon = () => ({
  Lobby: <Icon>dashboard</Icon>,
  Player: <Icon>perm_identity</Icon>,
  Referee: <Icon>pets</Icon>,
  Viewer: <Icon>restore</Icon>
});

const handleClick = (view, match, history) => {
  view = view !== "lobby" ? `/${view}` : "";
  history.push(`${match.url}${view}`);
};

const ViewsPanelMain = ({ classes, history, match }) => {
  return (
    <List component="nav" className={classes.container}>
      {["Lobby", "Player", "Referee", "Viewer"].map((text, index) => (
        <div key={index}>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleClick(text.toLowerCase(), match, history)}
          >
            <ListItemIcon>{ViewIcon()[text]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

const ViewsPanel = withRouter(ViewsPanelMain);

export default withStyles(styles)(ViewsPanel);
