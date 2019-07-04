import React, { useState, useContext, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { PageContext } from '../Store/Store';
import Switch from '../Components/switch';
import Input from '../Components/input';
import Table from '../Components/table';
import WishlistTable from '../Components/wishlistTable';
import { filmsHaveWatchedDB } from '../Arrays/filmsArray.js';
import { filmsWishlistDB } from '../Arrays/filmsArray.js';
import { tvHaveWatchedDB } from '../Arrays/tvArray.js';
import { tvWishlistDB } from '../Arrays/tvArray.js';
import { animeHaveWatchedDB } from '../Arrays/animeArray.js';
import { animeWishlistDB } from '../Arrays/animeArray.js';

import './../styles/container.css';

var newTable = tvHaveWatchedDB;
function Container(props) {
	//Context Api
	const [ page ] = useContext(PageContext);
	//Table setup
	const [ table, setTable ] = useState(newTable);
	//Form Setup:
	//The setup for handling data from the input form in the <Input /> component
	//Using React Hooks ,we append the information submitted to the local state
	const [ name, setName ] = useState('');
	const [ rating, setRating ] = useState('');
	const [ comment, setComment ] = useState('');

	//This function handles submit button. We use the information gathered in the local state
	function handleSubmit(e) {
		e.preventDefault();
		alert('* ' + name + ' * has been added');
		let obj = { Name: name, Rating: rating, Genre: 'Normal', Comment: comment };
		console.log(obj);
		newTable.push(obj);
		setName('');
		setDisplay('none');
	}
	//This function allows rows to be deleted
	function handleDeleteRow(i) {
		let rows = [ ...table ];
		rows.splice(i, 1);
		setTable(rows);
	}
	//Animations:
	//React Spring,using React Hooks, allows animation.
	const slide = useSpring({ marginLeft: 0, from: { marginLeft: 200 }, config: { friction: 60 } });
	//Animating Input Display
	const [ display, setDisplay ] = useState('none');
	function toggleDisplay() {
		setDisplay(display === 'none' ? '' : 'none');
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
	//Retrieving Data:
	//useEffect to determine table on mount
	useEffect(() => {
		setHaveWatched(true);
		setWillWatch(false);
	}, []);
	useEffect(
		() => {
			console.log('Have watched:', haveWatched);
			console.log('Will watch:', willWatch);
			selectingTable();
		},
		[ haveWatched ]
	);
	// a function to display the correcct table based on the page and toggle option
	function selectingTable() {
		if (page === 'Film') {
			if (haveWatched) {
				newTable = filmsHaveWatchedDB;
				setTable(newTable);
			} else if (!haveWatched) {
				newTable = filmsWishlistDB;
				setTable(newTable);
			}
		} else if (page === 'TV') {
			if (haveWatched === true && willWatch === false) {
				newTable = tvHaveWatchedDB;
				setTable(newTable);
			} else if (haveWatched === false && willWatch === true) {
				newTable = tvWishlistDB;
				setTable(newTable);
			}
		} else if (page === 'Anime') {
			if (haveWatched === true && willWatch === false) {
				newTable = animeHaveWatchedDB;
				setTable(newTable);
			} else if (haveWatched === false && willWatch === true) {
				newTable = animeWishlistDB;
				setTable(newTable);
			}
		}
	}

	return (
		<animated.div style={slide} className="filmscontainer">
			<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
				<p onClick={() => console.log('Return back home using react router')}>
					<i>Home</i>
					/<b>{page}</b>
				</p>
			</Link>
			<Switch selected={selected} selected1={selected1} toggleSelect={toggleSelect} />
			<p onClick={toggleDisplay} className="adding">
				+ Add {page}
			</p>
			<div style={{ display: display }}>
				<Input
					wishList={willWatch}
					handleSubmit={handleSubmit}
					setName={setName}
					setRating={setRating}
					setComment={setComment}
				/>
			</div>
			{willWatch === false ? (
				<Table films={table} handleDeleteRow={handleDeleteRow} />
			) : (
				<WishlistTable films={table} handleDeleteRow={handleDeleteRow} />
			)}
		</animated.div>
	);
}

export default Container;

/*
1-Local storage storing local users and profile apge
2-MongoDB
3-Dockers
 */
