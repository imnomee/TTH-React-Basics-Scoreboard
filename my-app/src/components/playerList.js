import React from "react";
import { Consumer } from "./Context/index";
import Player from "./player.js";

const PlayerList = () => {
	return (
		//we can destructure players direct from context as well. like {players}
		<Consumer>
			{({ players, actions }) => {
				return (
					<React.Fragment>
						{players.map((player, index) => (
							<Player
								isHighScore={actions.highScore === player.score}
								key={player.id.toString()}
								index={index}
							/>
						))}
					</React.Fragment>
				);
			}}
		</Consumer>
	);
};

export default PlayerList;
