import React from 'react';
import '../styles/menuCard.css';

function MenuCard(props) {
	return (
		<div className="menu-card">
			<div className="menu-card__image">
				<img src={require(`../styles/${props.name.toLowerCase()}.svg`)} alt={props.alt} />
			</div>
			<div className="card-caption">{props.name}</div>
		</div>
	);
}
export default MenuCard;
