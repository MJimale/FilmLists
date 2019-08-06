import React, { useCallback } from 'react';
import Logo from './../Components/logo';
import app from '../base';

import '../styles/loginForm.css';

const LoginForm = (props) => {
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
		<div className="login-wrap">
			<form className="login-form" id="login-form" onSubmit={handleLogin}>
				<Logo />
				<br />
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
						Login
					</button>
					<button
						type="button"
						className="forgot-password"
						id="btn-forgot-password"
						onClick={() => {
							props.setAddingUser(true);
						}}
					>
						Don't have an account? Click Here to Sign Up
					</button>
					{/*
            <button
              type="button"
              className="forgot-password"
              id="btn-forgot-password"
            >
              Forgot your password?
            </button>
            */}
				</section>
			</form>
		</div>
	);
};

export default LoginForm;
