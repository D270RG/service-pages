import React from 'react';
import { Button } from 'react-bootstrap';
import './AppHeader.scss';

function AppHeader(props: { logoElement: React.ReactElement; navElement: React.ReactElement }) {
	return (
		<div className='appHeaderContainer px-3'>
			{props.logoElement}
			{props.navElement}
			<Button className='btn btn-dark'>
				<i className='bi bi-cart-fill'></i>
			</Button>
		</div>
	);
}

export default AppHeader;
