import React from "react";
import PlayerList from "./playerList";
import Header from "./header";
import AddPlayerForm from "./addPlayerForm";

const App = () => {
	return (
		<div className="scoreboard">
			<Header />
			<PlayerList />
			<AddPlayerForm />
		</div>
	);
};

export default App;
