import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Col, Container, Dropdown, ListGroup, Nav, Row, Tab, Tabs } from 'react-bootstrap';
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
						<Dropdown.Toggle className='btn btn-light'>
							<i className='bi bi-list'></i>
						</Dropdown.Toggle>
						<Dropdown.Menu variant='dark'>{props.dropdownItems}</Dropdown.Menu>
					</Dropdown>
				)}
				<Link
					to='/cart'
					className='ps-1'>
					<Button className='btn btn-dark'>
						<i className='bi bi-basket3-fill'></i>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default AppHeader;
