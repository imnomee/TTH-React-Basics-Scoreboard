import React from "react";
import { Consumer } from "./Context/index";

const Counter = ({ index }) => {
	return (
		<Consumer>
			{({ actions, players }) => (
				<div className="counter">
					<button
						onClick={() => actions.changeScore(index, -1)}
						className="counter-action decrement">
						-
					</button>
					<span className="counter-score">
						{players[index].score}
					</span>
					<button
						onClick={() => actions.changeScore(index, +1)}
						className="counter-action increment">
						+
					</button>
				</div>
			)}
		</Consumer>
	);
};

export default Counter;
