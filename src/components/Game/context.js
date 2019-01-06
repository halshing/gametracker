import React from "react";

const GameContext = React.createContext();

export const withGame = Component => props => (
    <GameContext.Consumer>
        {game => <Component {...props} game={game} />}
    </GameContext.Consumer>
);

export default GameContext;
