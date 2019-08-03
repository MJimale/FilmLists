import React, { useContext, useState, useEffect } from 'react';
import app from '../base';
import { PageContext } from '../Store/Store';

function showData() {
	const [ page ] = useContext(PageContext);
	const [ tableData, setTableData ] = useState([]);

	useEffect(() => {
		const user = app.auth().currentUser;
		const unsuscribe = app
			.firestore()
			.collection('users/')
			.doc(user.uid)
			.collection('wishlist')
			.where(`uid`, '==', user.uid)
			.where(`type`, '==', page)
			.onSnapshot((snapshot) => {
				const newData = snapshot.docs.map((doc) => ({
					ID: doc.id,
					Name: doc.data().Name,
					Genre: doc.data().Genre,
					Comment: doc.data().Comment
				}));
				console.log(newData);
				setTableData(newData);
			});

		return () => unsuscribe();
	}, []);
	return tableData;
}

const WishlistTable = (props) => {
	const information = showData();
	return (
		<div>
			<label>Sort By</label>{' '}
			<select>
				<option>Name A to Z</option>
				<option>Name Z to A</option>
				<option disabled>---</option>
				<option>Genre A to Z</option>
				<option>Genre Z to A</option>
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
						<tr key={data.ID}>
							<td>{data.Name}</td>
							<td>{data.Genre}</td>
							<td>{data.Comment}</td>
							<td>
								<button onClick={(i) => props.handleDeleteRow(i)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WishlistTable;
