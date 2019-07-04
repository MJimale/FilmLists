import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PageContext } from './../Store/Store';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const [ page ] = useContext(PageContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (page === 'Home') {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: {
									from: props.location
								}
							}}
						/>
					);
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};
