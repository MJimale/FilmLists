import React, { useState, useEffect, useContext } from 'react';
import { UserStatusContext } from '../Store/Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../Router/ProtectedRoute';
import Container from '../Pages/Container';
import Loading from './../Pages/Loading';
import MainMenu from '../Pages/MainMenu.js';
import User from '../Pages/User';
import Error from './Error.js';
import app from '../base';

function Display() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={(props) => <MainMenu />} />
				<ProtectedRoute path="/films/" component={(props) => <Container {...props} />} />
				<ProtectedRoute path="/tv/" component={(props) => <Container {...props} />} />
				<ProtectedRoute path="/anime/" component={(props) => <Container {...props} />} />
				<Route component={Error} />
			</Switch>
		</BrowserRouter>
	);
}

function LoadingSetup() {
	const [ isLoading, setLoading ] = useState(true);
	const [ userStatus, setUserStatus ] = useContext(UserStatusContext);
	const userSelected = userStatus ? <Display /> : <User />;

	const element = isLoading ? <Loading /> : userSelected;
	app.auth().onAuthStateChanged(setUserStatus);
	setTimeout(() => {
		setLoading(false);
	}, 2500);
	return element;
}

export default LoadingSetup;
