import React from 'react';

function WishlistTable(props) {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Genre</th>
						<th>Comment</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{props.films.map((film, i) => {
						return (
							<tr key={i}>
								<td>{props.films[i].Name}</td>
								<td>{props.films[i].Genre}</td>
								<td>{props.films[i].Comment}</td>
								<td>
									<a onClick={(i) => props.handleDeleteRow(i)}>Delete</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default WishlistTable;
