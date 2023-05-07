import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppHeader.scss';

function AppHeader(props: { logoElement: React.ReactElement; navElement: React.ReactElement }) {
	return (
		<div className='appHeaderContainer'>
			<Link
				to='/home'
				className='px-3 logo'>
				{props.logoElement}
			</Link>
			<div className='navContainer'>{props.navElement}</div>
			<div className='px-2 btns-container'>
				<Button className='btn btn-light dropdown-toggler'>
					<i class='bi bi-list'></i>
				</Button>
				<Link
					to='/cart'
					className='ps-1'>
					<Button className='btn btn-dark'>
						<i className='bi bi-cart-fill'></i>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default AppHeader;
