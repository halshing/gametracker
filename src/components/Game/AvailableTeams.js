import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TeamCard from "./TeamCard";

const AvailableTeams = props => {
  const { data, openDialog } = props;
  return (
    <Grid container spacing={0}>
      {data.Status === "Open" && (
        <Grid container item spacing={24}>
          <Button color="primary" variant="contained" onClick={openDialog}>
            Create New Team
          </Button>
        </Grid>
      )}
      <Grid container item spacing={24} style={{ paddingTop: "40px" }}>
        {data.Teams.map((team, index) => {
          return (
            <Grid item key={index}>
              <TeamCard
                team={team}
                index={index}
                openDialog={openDialog}
                Status={data.Status}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default AvailableTeams;
