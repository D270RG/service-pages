import React from 'react';
import { Button } from 'react-bootstrap';
import './AppHeader.scss';

function AppHeader() {
	return (
		<div className='appHeaderContainer px-3 py-2'>
			ЯСветлый
			<Button className='btn btn-dark'>
				<i className='bi bi-cart-fill'></i>
			</Button>
		</div>
	);
}

export default AppHeader;
