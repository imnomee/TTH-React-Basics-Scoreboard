import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

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
	getHighScore = () => {
		const scores = this.state.players.map((p) => p.score);
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
		const highScore = this.getHighScore();
		const players = this.state.players; //initalPlayers array received in props
		return (
			<div className="scoreboard">
				{/* Passing props here to Header */}
				<Header players={players} />
				{/* Passing player props here to Player using map */}
				{players.map((player, index) => (
					<Player
						key={player.id.toString()} //React wants the unique key to be string
						name={player.name}
						score={player.score}
						id={player.id} //ID to delete player etc
						index={index}
						isHighScore={highScore === player.score}
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

Header.propTypes = {
	players: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
};

Header.defaultProps = {
	//this default is applied only if the title is empty in the Header or not received in props
	title: "Scoreboard",
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

Stats.propTypes = {
	players: PropTypes.arrayOf(
		PropTypes.shape({
			score: PropTypes.number,
		})
	),
};

class AddPlayerForm extends Component {
	playerInput = React.createRef();

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addPlayer(this.playerInput.current.value);
		e.currentTarget.reset();
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					ref={this.playerInput}
					placeholder="Enter a players Name"
				/>
				<input type="submit" value="Add Player" />
			</form>
		);
	}
}
class Player extends PureComponent {
	static propTypes = {
		name: PropTypes.string.isRequired,
		score: PropTypes.number,
		id: PropTypes.number,
		index: PropTypes.number,
		handleScore: PropTypes.func,
		removePlayer: PropTypes.func,
		isHighScore: PropTypes.bool,
	};
	render() {
		const {
			name,
			score,
			id,
			index,
			handleScore,
			removePlayer,
			isHighScore,
		} = this.props;
		console.log(name);

		return (
			<div className="player">
				<span className="player-name">
					<button
						onClick={() => removePlayer(id)}
						className="remove-player">
						✖
					</button>
					<Icon isHighScore={isHighScore} />
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
const Icon = ({ isHighScore }) => {
	return (
		<svg
			viewBox="0 0 44 35"
			className={isHighScore ? "is-high-score" : null}>
			<path
				d="M26.7616 10.6207L21.8192 0L16.9973 10.5603C15.3699 14.1207 10.9096 15.2672 7.77534 12.9741L0 7.24138L6.56986 28.8448H37.0685L43.5781 7.72414L35.7425 13.0948C32.6685 15.2672 28.3288 14.0603 26.7616 10.6207Z"
				transform="translate(0 0.301727)"
			/>
			<rect
				width="30.4986"
				height="3.07759"
				transform="translate(6.56987 31.5603)"
			/>
		</svg>
	);
};

Icon.propTypes = {
	isHighScore: PropTypes.bool,
};
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

Counter.propTypes = {
	index: PropTypes.number,
	score: PropTypes.number,
	handlescore: PropTypes.func,
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
