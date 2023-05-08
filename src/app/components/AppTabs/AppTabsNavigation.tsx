import path from 'path';
import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, ListGroup, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Route, Link, Routes, useLocation, BrowserRouter, Navigate } from 'react-router-dom';
import { TabMap, unrenderedTabs } from './tabs/index';
import './AppTabs.scss';

import translations from 'p@/descriptions/translations.json';
import { Languages } from 'p@/common-types/common-types';
import { InView } from 'react-intersection-observer';

function AppTabsNavigation(props: { setDropdownItems: (dropdownItems: JSX.Element[]) => void }) {
	const [navs, setNavs] = useState<JSX.Element[]>([]);

	const hiddenNavs: string[] = [];
	const location = useLocation();

	useEffect(() => {
		const navs: JSX.Element[] = [];
		const tabTranslations: any = translations[Languages.ru].tabs;
		TabMap.forEach((ComponentValue, pathKey) => {
			if (!unrenderedTabs.hasOwnProperty(pathKey))
				navs.push(
					<InView
						as='div'
						id={pathKey}
						onChange={(inView, entry) => {
							if (inView) {
								//remove from dropdown, possible browser compatibility problems here
								var index = hiddenNavs.indexOf(entry.target.id);
								if (index !== -1) {
									hiddenNavs.splice(index, 1);
								}
								console.log('removing', entry.target.id, hiddenNavs);
							} else {
								//add to dropdown
								hiddenNavs.push(entry.target.id);
								console.log('adding', entry.target.id, hiddenNavs);
							}
							//call dropdown callback
							props.setDropdownItems(
								hiddenNavs.map((navId: string) => {
									return (
										<Dropdown.Item
											key={navId}
											href={navId}>
											{tabTranslations[navId].title}
										</Dropdown.Item>
									);
								})
							);
						}}>
						<Nav.Item>
							<Nav.Link
								eventKey={pathKey}
								as={Link}
								to={pathKey}>
								{tabTranslations[pathKey].title}
							</Nav.Link>
						</Nav.Item>
					</InView>
				);
		});
		setNavs(navs);
	}, []);
	return (
		<div>
			<Tab.Container
				defaultActiveKey={'/'}
				activeKey={location.pathname.slice(
					location.pathname.lastIndexOf('/') + 1,
					location.pathname.length
				)}>
				<Nav className='flex-row tabs-container'>{navs.length > 0 && navs}</Nav>
			</Tab.Container>
		</div>
	);
}

export default AppTabsNavigation;
