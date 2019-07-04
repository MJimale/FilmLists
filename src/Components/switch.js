import React from 'react';
import './../styles/switch.css';

function Switch(props) {
	return (
		<div className="topbar">
			<span className={props.selected} onClick={props.toggleSelect}>
				Have watched
			</span>
			<label className="switch">
				<input type="checkbox" />
				<span onClick={props.toggleSelect} className="slider" />
			</label>
			<span className={props.selected1}>Will watch</span>
		</div>
	);
}

export default Switch;
