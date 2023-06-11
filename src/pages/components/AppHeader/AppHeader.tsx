import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import store from 'pages/store/store';
import './AppHeader.scss';
import { formSlice } from 'pages/store/reducers';
import { useSelector } from 'react-redux';
import { selectLoggedState } from 'pages/store/selectors';
import ProfilePicture from 'pages/elements/profilePicture/ProfilePicture';

function AppHeader(props: {
	navElement: React.ReactElement;
	logoElement: React.ReactElement;
	dropdownItems: JSX.Element[];
}) {
	const login = useSelector(selectLoggedState);
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
						<Dropdown.Toggle variant='outline-dark'>
							<i className='bi bi-list'></i>
						</Dropdown.Toggle>
						<Dropdown.Menu variant='light'>{props.dropdownItems}</Dropdown.Menu>
					</Dropdown>
				)}
				<Link
					to='/cart'
					className='ps-1'>
					<Button
						variant='outline-dark'
						className='login-button'>
						<i className='bi bi-basket3-fill'></i>
					</Button>
				</Link>

				{login === undefined ? (
					<Link
						to='#'
						className='ps-1'>
						<Button
							variant='outline-dark'
							onClick={() => store.dispatch(formSlice.actions.setVisibility({ visible: true }))}>
							<i className='bi bi-person-fill'></i>
						</Button>
					</Link>
				) : (
					<ProfilePicture
						className='ps-1'
						variant='light'
						login={login}
					/>
				)}
			</div>
		</div>
	);
}

export default AppHeader;
