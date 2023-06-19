import React from 'react';
import { Link } from 'react-router-dom';
import './Flyer.scss';

function Flyer(props: {
	title: string;
	contentImage?: React.ReactElement;
	contentText: string;
	href?: string;
}) {
	return (
		<div>
			{props.href ? (
				<Link to={props.href}>
					<div className='flyer cursor-pointer'>
						<div className='titleContainer'>
							<h2>{props.title}</h2>
						</div>
						<div className='imgContainer'>{props.contentImage}</div>
						<div className='textContainer'>{props.contentText}</div>
					</div>
				</Link>
			) : (
				<div className='flyer'>
					<div className='titleContainer'>
						<h2>{props.title}</h2>
					</div>
					<div className='imgContainer'>{props.contentImage}</div>
					<div className='textContainer'>{props.contentText}</div>
				</div>
			)}
		</div>
	);
}

export default Flyer;
