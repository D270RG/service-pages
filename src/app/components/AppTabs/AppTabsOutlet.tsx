import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppTabs from './AppTabs';
import './AppTabs.scss';
import AppTabsContent from './AppTabsContent';

function AppTabsOutlet() {
	return (
		<Container className='h-100'>
			<Row>
				<Col>
					<Routes>
						<Route
							index
							element={<Navigate to='/home' />}
						/>
						<Route
							path='/home/*'
							element={<AppTabsContent />}></Route>
					</Routes>
				</Col>
			</Row>
		</Container>
	);
}

export default AppTabsOutlet;
