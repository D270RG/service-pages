'use client';

import Image from 'next/image';
import * as Components from './components/index';
import './page.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
export default function Main() {
	return (
		<Container
			fluid
			className='m-0 p-0'>
			<Components.AppHeader />
			<Container>
				<Row>
					<Col>
						<Components.AppLogo />
						<BrowserRouter>
							<Routes>
								<Route
									index
									element={<Navigate to='/home' />}
								/>
								<Route
									path='/home/*'
									element={<Components.AppTabs />}></Route>
							</Routes>
						</BrowserRouter>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
