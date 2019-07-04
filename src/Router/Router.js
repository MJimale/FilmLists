import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Store from './../Store/Store';
import { ProtectedRoute } from '../Router/ProtectedRoute';
import Container from '../Pages/Container';
import Loading from './../Pages/Loading';
import MainMenu from '../Pages/MainMenu.js';
import Error from './Error.js';

function Display() {
	return (
		<Store>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={(props) => <MainMenu />} />
					<ProtectedRoute path="/films/" component={(props) => <Container {...props} />} />
					<ProtectedRoute path="/tv/" component={(props) => <Container {...props} />} />
					<ProtectedRoute path="/anime/" component={(props) => <Container {...props} />} />
					<Route component={Error} />
				</Switch>
			</BrowserRouter>
		</Store>
	);
}

function LoadingSetup() {
	const [ isLoading, setLoading ] = useState(true);
	const element = isLoading ? <Loading /> : <Display />;
	setTimeout(() => {
		setLoading(false);
	}, 2500);
	return element;
}

export default LoadingSetup;
