import React, { useState } from 'react';
import './../styles/suggestionCard.css';

function Random(props) {
	//Table:
	//Array to hold name of films in Wishlist Table
	var titles = [];
	//Populating the array above using data sent down as props
	props.films.map((film, i) => {
		return titles.push(props.films[i].Name);
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
