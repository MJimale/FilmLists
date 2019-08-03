import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import app from '../base';
import '../styles/input.css';

function Input(props) {
	const [ values, setValues ] = useState({});
	const handleChange = (event) => {
		event.persist();
		setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
	};
	function handleSubmit(e) {
		if (e) e.preventDefault();
		alert('* ' + values.name + ' * has been added');
		const user = app.auth().currentUser;
		const db = app.firestore().collection('users/').doc(user.uid);
		props.setDisplayInput('none');
		if (props.wishList) {
			let obj = {
				Name: values.name,
				Genre: values.genre,
				Comment: values.comment,
				WatchList: true,
				type: props.page,
				uid: user.uid,
				created: firebase.firestore.Timestamp.fromDate(new Date())
			};
			console.log(obj);
			db.collection('wishlist').add(obj).then(() => setValues({ name: '', rating: '', genre: '', comment: '' }));
		} else {
			let obj = {
				Name: values.name,
				Rating: values.rating,
				Genre: values.genre,
				Comment: values.comment,
				WatchList: false,
				type: props.page,
				uid: app.auth().currentUser.uid,
				Created: firebase.firestore.Timestamp.fromDate(new Date())
			};
			console.log(obj);
			console.log(values);
			db.collection('ratedlist').add(obj).then(() => setValues({ name: '', rating: '', genre: '', comment: '' }));
		}
	}

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
						<select name="rating" onChange={handleChange} value={values.rating} autoComplete="off" required>
							{numbers}
						</select>
					</td>
				</tr>
			);
		}
	};
	return (
		<div style={{ marginTop: '1%' }} className="input">
			<form onSubmit={handleSubmit}>
				<table>
					<tbody>
						<tr>
							<td>Name</td>
							<td>
								<input
									name="name"
									onChange={handleChange}
									value={values.name}
									autoComplete="off"
									required
								/>
							</td>
						</tr>
						{ratingRow()}
						<tr>
							<td>Genre</td>
							<td>
								<input
									name="genre"
									onChange={handleChange}
									value={values.genre}
									autoComplete="off"
									required
								/>
							</td>
						</tr>
						<tr>
							<td>Comment</td>
							<td>
								<input
									name="comment"
									onChange={handleChange}
									value={values.comment}
									autoComplete="off"
									required
								/>
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
