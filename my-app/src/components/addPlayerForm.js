import React, { Component } from "react";
import { Consumer } from "./Context/index";

class AddPlayerForm extends Component {
	playerInput = React.createRef();

	render() {
		return (
			<Consumer>
				{(actions) => {
					const handleSubmit = (e) => {
						e.preventDefault();
						actions.addPlayer(this.playerInput.current.value);
						e.currentTarget.reset();
					};
					return (
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								ref={this.playerInput}
								placeholder="Enter a players Name"
							/>
							<input type="submit" value="Add Player" />
						</form>
					);
				}}
			</Consumer>
		);
	}
}

export default AddPlayerForm;
