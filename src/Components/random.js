import React, { useState } from 'react';
import './../styles/suggestionCard.css';

function Random(props) {
	var titles = [];
	props.films.map((film, i) => {
		return titles.push(props.films[i].Name);
	});
	const [ displayedFilm, setDisplayedFilm ] = useState(titles[0]);
	function randomify() {
		function getNumber() {
			return (getNumber.number = Math.floor(Math.random() * titles.length)) === getNumber.lastNumber
				? getNumber()
				: (getNumber.lastNumber = getNumber.number);
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
