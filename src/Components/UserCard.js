import React from 'react';
import '../styles/userCard.css';

function userCard(props) {
	return (
		<div className="userCardContainer">
			{props.Adding === 'true' ? (
				<div
					className="buttonCardStyle"
					onClick={() => {
						props.setAddingUser(true);
					}}
				>
					+
				</div>
			) : (
				<div className="userCardStyle">
					<img src={require(`../styles/user-shadow.svg`)} alt="user" />
				</div>
			)}
			<h3 style={{ marginTop: '3%' }}>{props.user}</h3>
		</div>
	);
}

export default userCard;
