import React from 'react';
import { Link } from 'react-router-dom';
import './Flyer.scss';

function Flyer(props: {
	title: string;
	contentImage?: React.ReactElement;
	contentText: string;
	href: string;
}) {
	return (
		<Link to={props.href}>
			<div className='flyer'>
				<div className='titleContainer'>
					<h2>{props.title}</h2>
				</div>
				<div className='imgContainer'>{props.contentImage}</div>
				<div className='textContainer'>{props.contentText}</div>
			</div>
		</Link>
	);
}

export default Flyer;
