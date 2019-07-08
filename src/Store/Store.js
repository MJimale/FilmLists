import React, { useState } from 'react';

export const PageContext = React.createContext('Home');
export const UserContext = React.createContext('');
export const UserStatusContext = React.createContext('');
const Store = ({ children }) => {
	const [ page, setPage ] = useState('Home');
	const [ user, setUser ] = useState('');
	const [ userStatus, setUserStatus ] = useState(false);
	return (
		<UserContext.Provider value={[ user, setUser ]}>
			<UserStatusContext.Provider value={[ userStatus, setUserStatus ]}>
				<PageContext.Provider value={[ page, setPage ]}>{children}</PageContext.Provider>;
			</UserStatusContext.Provider>
		</UserContext.Provider>
	);
};

export default Store;
