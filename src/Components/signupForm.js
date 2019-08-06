import React, { useCallback } from 'react';
import Logo from './../Components/logo';
import app from '../base';

import '../styles/loginForm.css';

const SignupForm = (props) => {
	const handleSubmit = useCallback(async (event) => {
		event.preventDefault();
		const { name, email, password } = event.target.elements;
		alert('Thank you, ' + name.value + '. You have been added');
		try {
			await app.auth().createUserWithEmailAndPassword(email.value, password.value);
			const db = app.firestore();
			db.settings({
				timestampsInSnapshots: true
			});

			db.collection('users').add({
				name: name.value,
				email: email.value,
				uid: app.auth().currentUser.uid
			});
			app.auth().signOut();
			props.setAddingUser(false);
			return app.auth().currentUser.updateProfile({ displayName: name.value });
		} catch (error) {
			alert(error);
		}
	});

	return (
		<div className="login-wrap">
			<Logo />
			<br />
			<form className="login-form" id="login-form" onSubmit={handleSubmit}>
				<label className="password">
					<span className="label">Password</span>
					<input name="name" placeholder="Just Your First Name" id="input-name" autoComplete="off" required />
				</label>
				<label className="email">
					<span className="label">Email Address</span>
					<input
						name="email"
						type="email"
						placeholder="Email Address"
						id="input-email"
						autoFocus=""
						autoComplete="off"
						required
					/>
				</label>
				<label className="password">
					<span className="label">Password</span>
					<input
						name="password"
						type="password"
						placeholder="Password"
						id="input-password"
						autoComplete="off"
						required
					/>
				</label>

				<section className="actions">
					<button type="submit" className="login" id="btn-login">
						Sign Up
					</button>
					<button
						type="button"
						className="forgot-password"
						id="btn-forgot-password"
						onClick={() => {
							props.setAddingUser(false);
						}}
					>
						Have an Account? Login
					</button>
				</section>
			</form>
		</div>
	);
};

export default SignupForm;
