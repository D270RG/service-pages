'use client';

import * as Components from './components/index';
import './page.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Logo from './elements/smallLogo/Logo';
import { useState } from 'react';
import { TabMapKeys } from './components/AppTabs/tabs';
export default function Main() {
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);
	if (typeof window === 'undefined') return null;
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
			<div className='padded-page'>
				<Components.AppTabsOutlet />
			</div>
			<Components.AppFooter tabLinks={TabMapKeys} />
		</BrowserRouter>
	);
}
