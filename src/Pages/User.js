import React, { useState, useEffect } from 'react';
import UserCard from '../Components/UserCard';
import Logo from './../Components/logo';
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
				<label>Your Name: </label>
				<input onChange={(e) => props.setFirstName(e.target.value)} name="name" autoComplete="off" required />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

function DisplayUserCard(props) {
	var usersList = JSON.parse(localStorage.getItem('users')) === null ? [] : JSON.parse(localStorage.getItem('users'));
	return (
		<div>
			<h1>Whose Lists?</h1>
			{usersList.map((user, i) => {
				return <UserCard key={i} user={usersList[i].FirstName} />;
			})}

			<UserCard Adding="true" user="Add User" setAddingUser={props.setAddingUser} />
		</div>
	);
}

function User() {
	const [ addingUser, setAddingUser ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	var usersList = JSON.parse(localStorage.getItem('users'));
	useEffect(
		() => {
			localStorage.setItem('users', JSON.stringify(usersList));
		},
		[ usersList ]
	);

	function handleSubmit(e) {
		e.preventDefault();
		alert('Thank you, ' + firstName + '. You have been added');
		let oldUsersArray =
			JSON.parse(localStorage.getItem('users')) === null ? [] : JSON.parse(localStorage.getItem('users'));
		let newUsersArray = [ ...oldUsersArray ];
		let obj = { FirstName: firstName, ID: newUsersArray.length + 1 };
		//console.log(obj);
		newUsersArray.push(obj);
		localStorage.clear();
		localStorage.setItem('users', JSON.stringify(newUsersArray));
		//console.log(newUsersArray);
		//console.log(localStorage);
		setFirstName('');
		setAddingUser(false);
	}

	return (
		<div className="user">
			<Logo />
			{addingUser ? (
				<AddingUserForm handleSubmit={handleSubmit} setFirstName={setFirstName} />
			) : (
				<DisplayUserCard setAddingUser={setAddingUser} />
			)}
		</div>
	);
}

export default User;
