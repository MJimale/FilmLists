import React from 'react';
import sofa from './../styles/sofa.svg';

const Logo = () => {
	return (
		<div>
			<img className="image" alt="Logo" src={sofa} />
			<p className="preLogo">
				movie<b className="logo">RATINGS</b>
			</p>
		</div>
	);
};

export default Logo;
