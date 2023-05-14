'use client';

import * as Components from 'pages/components/index';
import { BrowserRouter } from 'react-router-dom';
import Logo from 'pages/elements/smallLogo/Logo';
import { useState } from 'react';
import { TabMapKeys } from 'pages/components/AppTabs/tabs';
import './_app.scss';

function SafeHydrate({ children }: { children: JSX.Element | JSX.Element[] }) {
	return (
		<div suppressHydrationWarning={true}>{typeof window === 'undefined' ? null : children}</div>
	);
}

export default function Main() {
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);
	return (
		<SafeHydrate>
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
		</SafeHydrate>
	);
}
