import path from 'path';
import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Route, Link, Routes, useLocation, BrowserRouter, Navigate } from 'react-router-dom';
import { IndexTab, TabMap, TabTranslates } from './tabs/index';
import './AppTabs.scss';

function AppTabsNavigation() {
	const [navs, setNavs] = useState<JSX.Element[]>([]);
	const location = useLocation();

	const fallbackRoute = (
		<Route
			path='/fallback'
			element={<div>fallback</div>}
		/>
	);
	useEffect(() => {
		const navs: JSX.Element[] = [];
		TabMap.forEach((ComponentValue, pathKey) => {
			navs.push(
				<Nav.Item>
					<Nav.Link
						eventKey={pathKey}
						as={Link}
						to={pathKey}>
						{TabTranslates[pathKey as keyof typeof TabTranslates]}
					</Nav.Link>
				</Nav.Item>
			);
		});
		setNavs(navs);
	}, []);
	return (
		<Tab.Container
			defaultActiveKey={'/'}
			activeKey={location.pathname.slice(
				location.pathname.lastIndexOf('/') + 1,
				location.pathname.length
			)}>
			<Nav className='flex-row'>{navs.length > 0 && navs}</Nav>
		</Tab.Container>
	);
}

export default AppTabsNavigation;
