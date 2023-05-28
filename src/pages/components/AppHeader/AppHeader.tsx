import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './AppHeader.scss';

function AppHeader(props: {
	navElement: React.ReactElement;
	logoElement: React.ReactElement;
	dropdownItems: JSX.Element[];
}) {
	return (
		<div className='appHeaderContainer'>
			<div className='appHeaderOverflowContainer'>
				<Link
					to='/home'
					className='px-3 logo'>
					{props.logoElement}
				</Link>
				<div className='navContainer'>{props.navElement}</div>
			</div>
			<div className='px-2 btns-container'>
				{props.dropdownItems.length > 0 && (
					<Dropdown>
						<Dropdown.Toggle variant='light'>
							<i className='bi bi-list'></i>
						</Dropdown.Toggle>
						<Dropdown.Menu variant='dark'>{props.dropdownItems}</Dropdown.Menu>
					</Dropdown>
				)}
				<Link
					to='/cart'
					className='ps-1'>
					<Button
						variant='dark'
						className='login-button'>
						<i className='bi bi-basket3-fill'></i>
					</Button>
				</Link>
				<Link
					to='/login'
					className='ps-1'>
					<Button variant='outline-dark'>
						<i className='bi bi-person-fill'></i>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default AppHeader;
