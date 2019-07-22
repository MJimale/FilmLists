import React, { useContext } from 'react';
import { UserContext, UserStatusContext } from '../Store/Store';
import '../styles/userCard.css';

function userCard(props) {
	const [ user, setUser ] = useContext(UserContext);
	const [ userStatus, setUserStatus ] = useContext(UserStatusContext);
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
				<div
					className="userCardStyle"
					onClick={() => {
						setUser(props.user);
						setUserStatus(true);
						console.log('Clicked.');
						console.log('User:', user);
						console.log('User Status:', userStatus);
					}}
				>
					<img src={require(`../styles/user-shadow.svg`)} alt="user" />
				</div>
			)}
			<h3 style={{ marginTop: '3%' }}>{props.user}</h3>
		</div>
	);
}

export default userCard;
