import app from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const getNextPlayer = (round, team) => {
  let players = Object.keys(team);
  return players[round % players.length];
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    const firestore = app.firestore();
    firestore.settings({ timestampsInSnapshots: true });

    this.firestore = firestore;
  }

  // Firestore API
  createGame = async data => {
    let game = await this.firestore.collection("games").add({
      Owner: data.username,
      Description: data.description,
      Status: "Open",
      GameTracker: { Active: false, Team: -1, Round: -1, Player: null },
      MaxRounds: data.rounds,
      Teams: [{ [data.username]: 0 }],
      Created: new Date().getTime(),
      StartTime: null,
      EndTime: null
    });
    this.gameId = game.id;
    return game;
  };

  getGameRef = id => {
    this.gameId = id || this.gameId;
    this.gameRef = this.firestore.doc(`games/${this.gameId}`);
    return this.gameRef;
  };

  getGameById = async id => {
    return await this.getGameRef(id).get();
  };

  getGamesByStatus = async status => {
    try {
      let games = await this.firestore
        .collection("games")
        .where("Status", "==", status)
        .get();
      return games.docs.map(game => ({ ...game.data(), GameID: game.id }));
    } catch (error) {
      console.error(error);
    }
  };

  addPlayer = async (username, teamIndex) => {
    try {
      await this.firestore.runTransaction(async t => {
        let doc = await t.get(this.gameRef);

        let game = doc.data();
        let teams = [];

        if (teamIndex > -1) {
          teams = [...game.Teams];
          teams[teamIndex][username] = 0;
        } else {
          teams = [...game.Teams, { [username]: 0 }];
        }
        t.set(this.gameRef, { Teams: teams }, { merge: true });
      });
    } catch (error) {
      console.error(error);
    }
  };

  startGame = async () => {
    try {
      await this.firestore.runTransaction(async t => {
        let doc = await t.get(this.gameRef);
        let game = doc.data();
        let player = Object.keys(game.Teams[0])[0];

        t.set(
          this.gameRef,
          {
            Status: "In Progress",
            StartTime: new Date().getTime(),
            GameTracker: { Active: true, Round: 0, Team: 0, Player: player }
          },
          { merge: true }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  updatePlayerScore = async ({ Team, Player }) => {
    try {
      await this.firestore.runTransaction(async t => {
        let doc = await t.get(this.gameRef);

        let game = doc.data();
        let teams = game.Teams;
        let team = teams[Team];

        team[Player] += 1;

        t.set(this.gameRef, { Teams: teams }, { merge: true });
      });
    } catch (error) {
      console.error(error);
    }
  };

  nextPlayer = async () => {
    try {
      await this.firestore.runTransaction(async t => {
        let doc = await t.get(this.gameRef);
        let game = doc.data();
        let { Teams, GameTracker } = game;
        let { Team, Round, Active } = GameTracker;
        let nextTeam = Active && Team < Teams.length - 1 ? ++Team : Team;
        let player = getNextPlayer(Round, Teams[nextTeam]);

        t.set(
          this.gameRef,
          {
            GameTracker: {
              Player: player,
              Team: nextTeam
            }
          },
          { merge: true }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  nextRound = async () => {
    try {
      await this.firestore.runTransaction(async t => {
        let doc = await t.get(this.gameRef);
        let game = doc.data();
        let { MaxRounds, GameTracker, Teams } = game;
        let { Round } = GameTracker;
        let nextRound = Round < MaxRounds - 1 ? ++Round : Round;

        t.set(
          this.gameRef,
          {
            GameTracker: {
              Player: getNextPlayer(nextRound, Teams[0]),
              Team: 0,
              Round: nextRound,
              Active: nextRound < MaxRounds
            }
          },
          { merge: true }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  endRound = async () => {
    try {
      await this.firestore.runTransaction(async t => {
        let doc = await t.get(this.gameRef);
        let game = doc.data();
        let { Status, MaxRounds, GameTracker } = game;
        let { Round } = GameTracker;
        let _status = Round < MaxRounds - 1 ? Status : "Done";

        t.set(
          this.gameRef,
          {
            Status: _status,
            EndTime: _status === "Done" ? new Date().getTime() : null,
            GameTracker: {
              Active: false,
              Team: null,
              Player: null
            }
          },
          { merge: true }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default Firebase;
