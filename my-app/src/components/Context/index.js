import React from "react";

const MainContext = React.createContext();
export class Provider extends React.Component {
	state = {
		players: [
			{
				name: "John",
				score: 0,
				id: 1,
			},
			{
				name: "Mike",
				score: 0,
				id: 2,
			},
			{
				name: "Billi",
				score: 0,
				id: 3,
			},
			{
				name: "Ronnie",
				score: 0,
				id: 4,
			},
		],
	};

	getHighScore = () => {
		const scores = this.state.players.map((p) => {
			console.log(p.score);
			return p.score;
		});
		const highScore = Math.max(...scores);
		if (highScore) {
			return highScore;
		} else {
			return null;
		}
	};
	handleRemovePlayer = (id) => {
		this.setState((prevState) => ({
			players: prevState.players.filter((player) => player.id !== id),
		}));
	};

	handleScoreChange = (index, delta) => {
		this.setState((prevState) => {
			return {
				score: (prevState.players[index].score += delta),
			};
		});
	};
	//player id counter
	prevPlayerId = 4;
	handleAddPlayer = (name) => {
		this.setState((prevState) => ({
			players: [
				...prevState.players,
				{
					name,
					score: 0,
					id: (this.prevPlayerId += 1),
				},
			],
		}));
	};

	render() {
		return (
			<MainContext.Provider
				value={{
					players: this.state.players,
					actions: {
						changeScore: this.handleScoreChange,
						removePlayer: this.handleRemovePlayer,
						addPlayer: this.handleAddPlayer,
						highScore: this.getHighScore(),
					},
				}}>
				{this.props.children}
			</MainContext.Provider>
		);
	}
}
export const Consumer = MainContext.Consumer;
