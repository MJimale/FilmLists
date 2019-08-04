import React, { useContext, useState, useEffect } from 'react';
import app from '../base';
import { PageContext } from '../Store/Store';

const SORT_OPTIONS = {
	NAME_ASC: { column: 'Name', direction: 'asc' },
	NAME_DESC: { column: 'Name', direction: 'desc' },

	GENRE_ASC: { column: 'Genre', direction: 'asc' },
	GENRE_DESC: { column: 'Genre', direction: 'desc' },

	RATING_ASC: { column: 'Rating', direction: 'asc' },
	RATING_DESC: { column: 'Rating', direction: 'desc' }
};

function handleDelete(e) {
	const user = app.auth().currentUser;
	let id = e.target.parentElement.parentElement.getAttribute('data_id');
	console.log(id);
	const unsuscribe = app
		.firestore()
		.collection('users/')
		.doc(user.uid)
		.collection('ratedlist')
		.doc(id)
		.delete()
		.then(function() {
			console.log('Document successfully deleted!');
		})
		.catch(function(error) {
			console.error('Error removing document: ', error);
		});
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
				.collection('ratedlist')
				.orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
				.where(`uid`, '==', user.uid)
				.where(`type`, '==', page)
				.onSnapshot((snapshot) => {
					const newData = snapshot.docs.map((doc) => ({
						ID: doc.id,
						Name: doc.data().Name,
						Rating: doc.data().Rating,
						Genre: doc.data().Genre,
						Comment: doc.data().Comment
					}));
					if (newData.length > 0) {
						setTableData(newData);
					} else {
						setTableData([
							{
								ID: 'N/A',
								Name: 'No entries in the your list',
								Rating: '0',
								Genre: '~~~',
								Comment: 'Add a new entry above'
							}
						]);
					}
				});

			return () => unsuscribe();
		},
		[ sortBy ]
	);
	return tableData;
}

const Table = (props) => {
	const [ sortBy, setSortby ] = useState();
	const information = showData(sortBy);
	return (
		<div>
			<label>Sort By</label>{' '}
			<select value={sortBy} onChange={(e) => setSortby(e.currentTarget.value)}>
				<option value="NAME_ASC">Name A to Z</option>
				<option value="NAME_DESC">Name Z to A</option>
				<option disabled>---</option>
				<option value="GENRE_ASC">Genre A to Z</option>
				<option value="GENRE_DESC">Genre Z to A</option>
				<option disabled>---</option>
				<option value="RATING_ASC">Rating Ascending</option>
				<option value="RATING_DESC">Rating Descending</option>
			</select>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Your Rating</th>
						<th>Genre</th>
						<th>Comment</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{information.map((data) => (
						<tr key={data.ID} data_id={data.ID}>
							<td>{data.Name}</td>
							<td>{data.Rating}</td>
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

export default Table;
