import React, { useEffect, useState } from 'react';
import { Dropdown, Nav, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { TabMap, unrenderedTabs } from './tabs/index';
import './AppTabs.scss';

import { ITabTranslations } from 'p@/common-types/common-types';
import { InView } from 'react-intersection-observer';

function AppTabsNavigation(props: {
	tabTranslations: ITabTranslations;
	setDropdownItems: (dropdownItems: JSX.Element[]) => void;
}) {
	const [navs, setNavs] = useState<JSX.Element[]>([]);

	const hiddenNavs: string[] = [];
	const location = useLocation();

	useEffect(() => {
		const navs: JSX.Element[] = [];
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
							} else {
								//add to dropdown
								hiddenNavs.push(entry.target.id);
							}
							console.log('tab translations', props.tabTranslations, hiddenNavs);
							//call dropdown callback
							props.setDropdownItems(
								hiddenNavs.map((navId: string) => {
									return (
										<Dropdown.Item
											key={navId}
											href={navId}>
											{props.tabTranslations[navId].title}
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
								{props.tabTranslations[pathKey].title}
							</Nav.Link>
						</Nav.Item>
					</InView>
				);
		});
		setNavs(navs);

		console.log(
			'path',
			location.pathname
				.slice(0, -1)
				.slice(
					location.pathname.slice(0, -1).lastIndexOf('/') + 1,
					location.pathname.slice(0, -1).length
				)
		);
	}, []);
	return (
		<div>
			<Tab.Container
				defaultActiveKey={'/'}
				mountOnEnter={true}
				unmountOnExit={true}
				activeKey={location.pathname
					.replace(/\/$/, '')
					.slice(
						location.pathname.replace(/\/$/, '').lastIndexOf('/') + 1,
						location.pathname.replace(/\/$/, '').length
					)}>
				<Nav className='flex-row tabs-container'>{navs.length > 0 && navs}</Nav>
			</Tab.Container>
		</div>
	);
}

export default AppTabsNavigation;
