import React, { useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { PageContext } from '../Store/Store';
import app from '../base';
import Logo from './../Components/logo';
import MenuCard from './../Components/menuCard';
import './../styles/menu.css';

function MainMenu(props) {
	const slide = useSpring({ opacity: 1, from: { opacity: 0 }, config: { tension: 30 } });
	const [ page, setPage ] = useContext(PageContext);
	var account = app.auth().currentUser ? app.auth().currentUser.displayName : 'someone';
	return (
		<animated.div style={slide}>
			<div className="App">
				<Logo />
				<button
					onClick={() => {
						app.auth().signOut();
					}}
				>
					Logout
				</button>
				<h3>Hello {account}</h3>
				<Link onClick={() => setPage('Film')} to="/films">
					<MenuCard name="Film" alt="mainMenu_film_option" />
				</Link>
				<Link onClick={() => setPage('TV')} to="/tv">
					<MenuCard name="TV" alt="mainMenu_tv_option" />
				</Link>
				<Link onClick={() => setPage('Anime')} to="/anime">
					<MenuCard name="Anime" alt="mainMenu_anime_option" />
				</Link>
			</div>
		</animated.div>
	);
}

export default MainMenu;
