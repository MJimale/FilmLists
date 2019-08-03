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
			.collection('ratedlist')
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
				console.log(newData);
				setTableData(newData);
			});

		return () => unsuscribe();
	}, []);
	return tableData;
}

const Table = (props) => {
	const information = showData();
	return (
		<div>
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
						<tr key={data.ID}>
							<td>{data.Name}</td>
							<td>{data.Rating}</td>
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

export default Table;
