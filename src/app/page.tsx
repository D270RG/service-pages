'use client';

import Image from 'next/image';
import * as Components from './components/index';
import './page.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Logo from './elements/smallLogo/Logo';
import { useState } from 'react';
export default function Main() {
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);
	return (
		<BrowserRouter>
			<Components.AppHeader
				logoElement={<Logo />}
				dropdownItems={dropdownItems}
				navElement={
					<Components.AppTabsNavigation
						setDropdownItems={(items) => {
							console.log('set dropdownItems');
							setDropdownItems(items);
						}}
					/>
				}
			/>
			<div className='paddedPage'>
				<Components.AppTabsOutlet />
			</div>
		</BrowserRouter>
	);
}
