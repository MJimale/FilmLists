import React, { useState, useCallback } from 'react';
import Logo from './../Components/logo';
import app from '../base';
//import a user context which we will pass on later on.
/* 
create a golbal context that sets user to whatever their name is
and then conditional render display the rest of the app.
endsession so user has to reselect on each load
logout button and then redisplay users

*/
import '../styles/userCard.css';

function AddingUserForm(props) {
	return (
		<div>
			<h1>Add Profile</h1>
			<form onSubmit={props.handleSubmit}>
				<label>
					Your Name:
					<input name="name" autoComplete="off" required />
				</label>
				<label>
					Email:
					<input name="email" type="email" autoComplete="off" required />
				</label>
				<label>
					Password:
					<input name="password" type="password" autoComplete="off" required />
				</label>
				<button type="submit">Submit</button>
			</form>
			<button
				onClick={() => {
					props.setAddingUser(false);
				}}
			>
				Have an Account? Login
			</button>
		</div>
	);
}

function DisplayUserCard(props) {
	return (
		<div>
			<h1>Whose Lists?</h1>
			<form onSubmit={props.handleLogin}>
				<label>
					Email:
					<input name="email" type="email" autoComplete="off" required />
				</label>
				<label>
					Password:
					<input name="password" type="password" autoComplete="off" required />
				</label>
				<button type="submit">Submit</button>
			</form>
			<button
				onClick={() => {
					props.setAddingUser(true);
				}}
			>
				Sign up
			</button>
		</div>
	);
}

function User() {
	const [ addingUser, setAddingUser ] = useState(false);
	const handleSubmit = useCallback(async (event) => {
		event.preventDefault();
		const { name, email, password } = event.target.elements;
		alert('Thank you, ' + name.value + '. You have been added');
		try {
			await app.auth().createUserWithEmailAndPassword(email.value, password.value);
			app.auth().signOut();
			setAddingUser(false);
			return app.auth().currentUser.updateProfile({ displayName: name.value });
		} catch (error) {
			alert(error);
		}
	});

	const handleLogin = useCallback(async (event) => {
		event.preventDefault();
		const { email, password } = event.target.elements;
		try {
			await app.auth().signInWithEmailAndPassword(email.value, password.value);
			console.log(app.auth().currentUser);
		} catch (error) {
			alert(error);
		}
	});

	return (
		<div className="user">
			<Logo />
			{addingUser ? (
				<AddingUserForm handleSubmit={handleSubmit} setAddingUser={setAddingUser} />
			) : (
				<DisplayUserCard handleLogin={handleLogin} setAddingUser={setAddingUser} />
			)}
		</div>
	);
}

export default User;
