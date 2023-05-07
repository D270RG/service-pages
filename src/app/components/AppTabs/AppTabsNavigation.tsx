import path from 'path';
import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Route, Link, Routes, useLocation, BrowserRouter, Navigate } from 'react-router-dom';
import { TabMap, unrenderedTabs } from './tabs/index';
import './AppTabs.scss';

import translations from 'p@/descriptions/translations.json';
import { Languages } from 'p@/common-types/common-types';

function AppTabsNavigation() {
	const [navs, setNavs] = useState<JSX.Element[]>([]);
	const location = useLocation();

	useEffect(() => {
		const navs: JSX.Element[] = [];
		const tabTranslations: any = translations[Languages.ru].tabs;
		TabMap.forEach((ComponentValue, pathKey) => {
			if (!unrenderedTabs.hasOwnProperty(pathKey))
				navs.push(
					<Nav.Item>
						<Nav.Link
							eventKey={pathKey}
							as={Link}
							to={pathKey}>
							{tabTranslations[pathKey].title}
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
			<Nav className='flex-row tabs-container'>{navs.length > 0 && navs}</Nav>
		</Tab.Container>
	);
}

export default AppTabsNavigation;
