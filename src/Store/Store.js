import React, { useState } from 'react';

export const PageContext = React.createContext('Home');

const Store = ({ children }) => {
	const [ page, setPage ] = useState('Home');

	return <PageContext.Provider value={[ page, setPage ]}>{children}</PageContext.Provider>;
};

export default Store;
