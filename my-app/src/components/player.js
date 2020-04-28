import React, { PureComponent } from "react";
import { Consumer } from "../components/Context/index";
import Icon from "./icon.js";
import Counter from "./counter.js";

class Player extends PureComponent {
	render() {
		const { index, isHighScore } = this.props;
		return (
			<Consumer>
				{({ actions, players }) => {
					return (
						<div className="player">
							<span className="player-name">
								<button
									onClick={() =>
										actions.removePlayer(players[index].id)
									}
									className="remove-player">
									✖
								</button>
								<Icon isHighScore={isHighScore} />
								{players[index].name}
							</span>
							<Counter index={index} />
						</div>
					);
				}}
			</Consumer>
		);
	}
}

export default Player;
