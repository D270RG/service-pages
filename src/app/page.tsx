'use client';

import Image from 'next/image';
import * as Components from './components/index';
import './page.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Logo from './elements/smallLogo/Logo';
export default function Main() {
	return (
		<BrowserRouter>
			<Container fluid>
				<Container
					fluid
					className='m-0 p-0'>
					<Components.AppHeader
						logoElement={<Logo />}
						navElement={<Components.AppTabsNavigation />}
					/>
				</Container>
				<Container>
					<Components.AppTabsOutlet />
				</Container>
			</Container>
		</BrowserRouter>
	);
}
