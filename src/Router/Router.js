import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Store/Store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../Router/ProtectedRoute';
import Container from '../Pages/Container';
import Loading from './../Pages/Loading';
import MainMenu from '../Pages/MainMenu.js';
import User from '../Pages/User';
import Error from './Error.js';

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
	const [ userStatus ] = useContext(UserContext);
	const userSelected = userStatus ? <Display /> : <User />;

	const element = isLoading ? <Loading /> : userSelected;
	useEffect(
		() => {
			console.log('User state in Router:', typeof userStatus);
			console.log('User state in Router:', userStatus);
		},
		[ userStatus ]
	);
	setTimeout(() => {
		setLoading(false);
	}, 2500);
	return element;
}

export default LoadingSetup;
