import React from "react";
import { Consumer } from "./Context/index";

const Stats = () => {
	return (
		<Consumer>
			{
				//context is the value from Provder. we can name it anything. here its context
				({ players }) => {
					console.log("Stats", players);
					const totalPlayers = players.length;
					const totalPoints = players.reduce((total, single) => {
						return total + single.score;
					}, 0);

					return (
						<table className="stats">
							<tbody>
								<tr>
									<td>Players:</td>
									<td>{totalPlayers}</td>
								</tr>
								<tr>
									<td>Total Points:</td>
									<td>{totalPoints}</td>
								</tr>
							</tbody>
						</table>
					);
				}
			}
		</Consumer>
	);
};

export default Stats;
