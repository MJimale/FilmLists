import React, { useContext, useState, useEffect } from 'react';
import app from '../base';
import { PageContext } from '../Store/Store';

const SORT_OPTIONS = {
	NAME_ASC: { column: 'Name', direction: 'asc' },
	NAME_DESC: { column: 'Name', direction: 'desc' },

	GENRE_ASC: { column: 'Genre', direction: 'asc' },
	GENRE_DESC: { column: 'Genre', direction: 'desc' }
};
function handleDelete(e) {
	const user = app.auth().currentUser;
	let id = e.target.parentElement.parentElement.getAttribute('data_id');

	const unsuscribe = app
		.firestore()
		.collection('users/')
		.doc(user.uid)
		.collection('wishlist')
		.where(`uid`, '==', user.uid)
		.doc(id)
		.delete();
	return () => unsuscribe();
}

function showData(sortBy = 'NAME_ASC') {
	const [ page ] = useContext(PageContext);
	const [ tableData, setTableData ] = useState([]);

	useEffect(
		() => {
			const user = app.auth().currentUser;
			const unsuscribe = app
				.firestore()
				.collection('users/')
				.doc(user.uid)
				.collection('wishlist')
				.orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
				.where(`uid`, '==', user.uid)
				.where(`type`, '==', page)
				.onSnapshot((snapshot) => {
					const newData = snapshot.docs.map((doc) => ({
						ID: doc.id,
						Name: doc.data().Name,
						Genre: doc.data().Genre,
						Comment: doc.data().Comment
					}));
					setTableData(newData);
				});

			return () => unsuscribe();
		},
		[ sortBy ]
	);
	return tableData;
}

const WishlistTable = (props) => {
	const [ sortBy, setSortby ] = useState();
	const information = showData(sortBy);
	return (
		<div>
			<label>Sort By:</label>{' '}
			<select value={sortBy} onChange={(e) => setSortby(e.currentTarget.value)}>
				<option value="NAME_ASC">Name A to Z</option>
				<option value="NAME_DESC">Name Z to A</option>
				<option disabled>---</option>
				<option value="GENRE_ASC">Genre A to Z</option>
				<option value="GENRE_DESC">Genre Z to A</option>
			</select>
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
					{information.map((data) => (
						<tr key={data.ID} data_id={data.ID}>
							<td>{data.Name}</td>
							<td>{data.Genre}</td>
							<td>{data.Comment}</td>
							<td>
								<button onClick={(e) => handleDelete(e)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WishlistTable;
