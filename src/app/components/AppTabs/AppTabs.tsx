import path from 'path';
import React, { useEffect, useState } from 'react';
import { ListGroup, Nav, Tab, Tabs } from 'react-bootstrap';
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import { IndexTab, TabMap, TabTranslates } from './tabs/index';
import './AppTabs.scss';

function AppTabs() {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const [navs, setNavs] = useState<JSX.Element[]>([]);
	const location = useLocation();

	const fallbackRoute = (
		<Route
			path='/fallback'
			element={<div>fallback</div>}
		/>
	);
	useEffect(() => {
		const tabs: JSX.Element[] = [];
		tabs.push(
			<Route
				index
				element={<IndexTab />}></Route>
		);
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
			tabs.push(
				<Route
					path={pathKey}
					element={
						<React.Suspense fallback={<div>Loading</div>}>
							<ComponentValue />
						</React.Suspense>
					}></Route>
			);
		});
		setNavs(navs);
		setTabs(tabs);
	}, []);
	return (
		<Tab.Container
			defaultActiveKey={'/'}
			activeKey={location.pathname.slice(
				location.pathname.lastIndexOf('/') + 1,
				location.pathname.length
			)}>
			<Nav className='flex-row'>{navs.length > 0 && navs}</Nav>
			<Tab.Content>
				<Routes>{tabs.length > 0 ? tabs : fallbackRoute}</Routes>
			</Tab.Content>
		</Tab.Container>
	);
}

export default AppTabs;
