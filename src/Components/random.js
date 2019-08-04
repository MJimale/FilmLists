import React, { useContext, useState, useEffect } from 'react';
import app from '../base';
import { PageContext } from '../Store/Store';

import './../styles/suggestionCard.css';
function showData() {
	const [ page ] = useContext(PageContext);
	const [ tableData, setTableData ] = useState([]);

	useEffect(() => {
		const user = app.auth().currentUser;
		const unsuscribe = app
			.firestore()
			.collection('users/')
			.doc(user.uid)
			.collection('wishlist')
			.where(`uid`, '==', user.uid)
			.where(`type`, '==', page)
			.onSnapshot((snapshot) => {
				const newData = snapshot.docs.map((doc) => ({
					Name: doc.data().Name
				}));
				console.log(newData);
				setTableData(newData);
			});

		return () => unsuscribe();
	}, []);
	return tableData;
}

function Random(props) {
	const information = showData();
	//Table:
	//Array to hold name of films in Wishlist Table
	var titles = [];
	//Populating the array above using data sent down as props
	information.map((title) => {
		return titles.push(title.Name);
	});
	//Random Film Display:
	//Hook to manage what film is displayed
	const [ displayedFilm, setDisplayedFilm ] = useState(titles[0]);
	//Function to generate random film
	const [ previousNumbers, setPreviousNumbers ] = useState([ 0 ]);
	function randomify() {
		function getNumber() {
			var randomNumber;
			var array = [ ...previousNumbers ];
			randomNumber = Math.floor(Math.random() * titles.length);
			if (randomNumber === array[array.length - 1]) {
				if (randomNumber === 0) {
					randomNumber++;
				} else {
					randomNumber--;
				}
			}
			array.push(randomNumber);
			setPreviousNumbers([ ...array ]);
			console.log('randomNumber:', randomNumber);
			console.log('previousNumber:', previousNumbers);
			return randomNumber;
		}
		var randomNumber = getNumber();
		var randomFilms = titles[randomNumber];
		setDisplayedFilm(randomFilms);
	}

	return (
		<div className="suggestion-card">
			<button onClick={() => props.close()}>Close</button>
			<h2>{displayedFilm}</h2>
			<p />

			<button onClick={() => randomify()}>Next Suggestion</button>
		</div>
	);
}

export default Random;
