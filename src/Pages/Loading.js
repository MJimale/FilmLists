import React from 'react';
import { useSpring, animated } from 'react-spring';
import logo from './../styles/sofa.svg';
import './../styles/menu.css';

function Loading() {
	const slide = useSpring({
		opacity: 1,
		marginLeft: 0,
		display: '',
		from: { opacity: 0, marginLeft: -40, display: 'none' },
		delay: 1000
	});
	const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
	return (
		<div className="outer">
			<div className="middle">
				<div className="test">
					<animated.img className="image" style={fade} src={logo} />
					<animated.p style={slide}>
						movie<b className="logo">RATINGS</b>
					</animated.p>
				</div>
			</div>
		</div>
	);
}

export default Loading;
