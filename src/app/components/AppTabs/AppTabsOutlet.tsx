import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppTabs from './AppTabsNavigation';
import './AppTabs.scss';
import AppTabsContent from './AppTabsContent';

function AppTabsOutlet() {
	return (
		<Row>
			<Col>
				<Routes>
					<Route
						index
						element={<Navigate to='/home' />}
					/>
					<Route
						path='/*'
						element={<AppTabsContent />}></Route>
				</Routes>
			</Col>
		</Row>
	);
}

export default AppTabsOutlet;
