import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppHeader.scss';

function AppHeader(props: { logoElement: React.ReactElement; navElement: React.ReactElement }) {
	return (
		<div className='appHeaderContainer'>
			<div className='px-3'>{props.logoElement}</div>
			<div className='navContainer'>{props.navElement}</div>
			<Link
				to='/cart'
				className='px-3'>
				<Button className='btn btn-dark'>
					<i className='bi bi-cart-fill'></i>
				</Button>
			</Link>
		</div>
	);
}

export default AppHeader;
