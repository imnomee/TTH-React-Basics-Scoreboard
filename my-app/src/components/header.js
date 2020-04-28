import React from "react";
import Stats from "./stats";
import Stopwatch from "./stopwatch";
const Header = ({ title }) => {
	//You can use dot notation like props.title, props.totalPlayers to access these
	return (
		<header>
			<Stats />
			<h1>{(title = "Scoreboard")}</h1>
			<Stopwatch />
		</header>
	);
};

export default Header;
