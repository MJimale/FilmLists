import React, { useState, useContext, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { PageContext } from '../Store/Store';
import Switch from '../Components/switch';
import Input from '../Components/input';
import Table from '../Components/table';
import Random from '../Components/random';
import WishlistTable from '../Components/wishlistTable';

import './../styles/container.css';

function Container(props) {
	//Context Api
	const [ page ] = useContext(PageContext);
	//Animations:
	//React Spring,using React Hooks, allows animation.
	const slide = useSpring({ marginLeft: 0, from: { marginLeft: 200 }, config: { friction: 60 } });
	//Toggling Input display
	const [ displayInput, setDisplayInput ] = useState('none');
	function toggleDisplayInput() {
		setDisplayInput(displayInput === 'none' ? '' : 'none');
	}
	//Toggling Suggestion Box display
	const [ displaySuggestion, setDisplaySuggestion ] = useState('none');
	function toggleSuggestionDisplay() {
		setDisplaySuggestion(displaySuggestion === 'none' ? '' : 'none');
	}
	//Animating Slider and Highlighting the Selected Option
	const [ selected, setSelected ] = useState('topbarSelected');
	const [ selected1, setSelected1 ] = useState('');
	const [ haveWatched, setHaveWatched ] = useState('');
	const [ willWatch, setWillWatch ] = useState('');
	function toggleSelect() {
		//willWatch === false ? setWillWatch(true) : setWillWatch(false);
		if (haveWatched === false && willWatch === true) {
			setHaveWatched(true);
			setWillWatch(false);
			setSelected('topbarSelected');
			setSelected1('');
		} else if (haveWatched === true && willWatch === false) {
			setHaveWatched(false);
			setWillWatch(true);
			setSelected('');
			setSelected1('topbarSelected');
		}
	}
	//Table setup
	//useEffect to determine table component to mount
	useEffect(() => {
		setHaveWatched(true);
		setWillWatch(false);
	}, []);

	return (
		<animated.div style={slide} className="filmscontainer">
			<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
				<p onClick={() => console.log('Return back home using react router')}>
					<i>Home</i>
					/<b>{page}</b>
				</p>
			</Link>
			<Switch selected={selected} selected1={selected1} toggleSelect={toggleSelect} />
			<p onClick={toggleDisplayInput} className="adding">
				+ Add {page}
			</p>
			<div style={{ display: displayInput }}>
				<Input page={page} wishList={willWatch} setDisplayInput={setDisplayInput} />
			</div>

			{willWatch === false ? (
				<Table />
			) : (
				<div>
					<p onClick={toggleSuggestionDisplay} className="adding">
						+ Need a Suggestion
					</p>
					<div style={{ display: displaySuggestion }}>
						<Random close={toggleSuggestionDisplay} />
					</div>
					<WishlistTable />
				</div>
			)}
		</animated.div>
	);
}

export default Container;

/*
1-MongoDB
2-Dockers
 */
