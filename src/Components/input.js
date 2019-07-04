import React from 'react';
import '../styles/input.css';

function Input(props) {
	const numbers = [];

	for (var i = 0; i < 11; i++) {
		numbers.push(<option key={i}>{i}</option>);
	}
	const ratingRow = () => {
		if (!props.wishList) {
			return (
				<tr>
					<td>Your Rating</td>
					<td>
						<select>{numbers}</select>
					</td>
				</tr>
			);
		}
	};
	return (
		<div style={{ marginTop: '1%' }} className="input">
			<form onSubmit={props.handleSubmit}>
				<table>
					<tbody>
						<tr>
							<td>Name</td>
							<td>
								<input
									onChange={(e) => props.setName(e.target.value)}
									name="name"
									autoComplete="off"
									required
								/>
							</td>
						</tr>
						{ratingRow()}
						<tr>
							<td>Genre</td>
							<td>
								<input />
							</td>
						</tr>
						<tr>
							<td>Comment</td>
							<td>
								<input />
							</td>
						</tr>
						<tr>
							<td>
								<button type="submit">Submit</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	);
}

export default Input;
