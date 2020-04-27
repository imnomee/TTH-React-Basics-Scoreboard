import React, { Component, PureComponent } from "react";

class App extends Component {
	state = {
		players: [
			{
				name: "Nomee",
				score: 0,
				id: 1,
			},
			{
				name: "Hammad",
				score: 0,
				id: 2,
			},
			{
				name: "Mansoor",
				score: 0,
				id: 3,
			},
			{
				name: "Wahab",
				score: 0,
				id: 4,
			},
		],
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
		const players = this.state.players; //initalPlayers array received in props
		return (
			<div className="scoreboard">
				{/* Passing props here to Header */}
				<Header title="Scoreboard" players={players} />
				{/* Passing player props here to Player using map */}
				{players.map((player, index) => (
					<Player
						key={player.id.toString()} //React wants the unique key to be string
						name={player.name}
						score={player.score}
						id={player.id} //ID to delete player etc
						index={index}
						handleScore={this.handleScoreChange}
						removePlayer={this.handleRemovePlayer} //method passed to player props
					/>
				))}
				<AddPlayerForm addPlayer={this.handleAddPlayer} />
			</div>
		);
	}
}

const Header = ({ players, title }) => {
	//You can use dot notation like props.title, props.totalPlayers to access these
	return (
		<header>
			<Stats players={players} />
			<h1>{title}</h1>
			<Stopwatch />
		</header>
	);
};

const Stats = ({ players }) => {
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
};

class AddPlayerForm extends Component {
	state = {
		value: "",
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addPlayer(this.state.value);
		this.setState({ value: "" });
	};
	handleValueChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleValueChange}
					placeholder="Enter a players Name"
				/>
				<input type="submit" value="Add Player" />
			</form>
		);
	}
}

class Player extends PureComponent {
	render() {
		const {
			name,
			score,
			id,
			index,
			handleScore,
			removePlayer,
		} = this.props;
		console.log(name);

		return (
			<div className="player">
				<span className="player-name">
					<button
						onClick={() => removePlayer(id)}
						className="remove-player">
						x
					</button>
					{name}
				</span>
				{/* Counter props are passed here */}
				<Counter
					index={index}
					score={score}
					handleScore={handleScore}
				/>
			</div>
		);
	}
}

const Counter = ({ index, score, handleScore }) => {
	return (
		<div className="counter">
			<button
				onClick={() => handleScore(index, -1)}
				className="counter-action decrement">
				-
			</button>
			<span className="counter-score">{score}</span>
			<button
				onClick={() => handleScore(index, +1)}
				className="counter-action increment">
				+
			</button>
		</div>
	);
};

class Stopwatch extends Component {
	state = {
		isRunning: false,
		elapsedTime: 0,
		previousTime: 0,
	};
	componentDidMount() {
		this.intervalID = setInterval(() => this.watchTick(), 100);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	watchTick = () => {
		if (this.state.isRunning) {
			const now = Date.now();
			this.setState((prevState) => ({
				previousTime: now,
				elapsedTime:
					prevState.elapsedTime + (now - this.state.previousTime),
			}));
		}
	};
	handleStopWatch = () => {
		this.setState((prevState) => ({
			isRunning: !prevState.isRunning,
		}));
		if (!this.state.isRunning) {
			this.setState({
				previousTime: Date.now(),
			});
		}
	};

	handleReset = () => {
		this.setState({
			elapsedTime: 0,
		});
	};
	render() {
		const seconds = Math.floor(this.state.elapsedTime / 1000);
		return (
			<div className="stopwatch">
				<h2>Stopwatch</h2>
				<span className="stopwatch-time">{seconds}</span>
				<button onClick={this.handleStopWatch}>
					{this.state.isRunning ? "Stop" : "Start"}
				</button>
				<button onClick={this.handleReset}>Reset</button>
			</div>
		);
	}
}
export default App;
