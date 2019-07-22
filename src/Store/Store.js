import React, { useState } from 'react';

export const PageContext = React.createContext('Home');
export const UserStatusContext = React.createContext('');
const Store = ({ children }) => {
	const [ page, setPage ] = useState('Home');
	const [ userStatus, setUserStatus ] = useState(false);
	return (
		<UserStatusContext.Provider value={[ userStatus, setUserStatus ]}>
			<PageContext.Provider value={[ page, setPage ]}>{children}</PageContext.Provider>;
		</UserStatusContext.Provider>
	);
};

export default Store;
