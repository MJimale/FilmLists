import React, { useState } from 'react';
import LoginForm from './../Components/loginForm.js';
import SignupForm from './../Components/signupForm';

import '../styles/loginForm.css';

function User() {
	const [ addingUser, setAddingUser ] = useState(false);

	return (
		<div className="loginpage-wrap">
			{addingUser ? <SignupForm setAddingUser={setAddingUser} /> : <LoginForm setAddingUser={setAddingUser} />}
		</div>
	);
}

export default User;
