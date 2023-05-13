'use client';

import * as Components from './components/index';
import { BrowserRouter } from 'react-router-dom';
import Logo from './elements/smallLogo/Logo';
import { createElement, Suspense, useEffect, useRef, useState } from 'react';
import { TabMapKeys } from './components/AppTabs/tabs';
import './_app.scss';
import Loading from './elements/loading/loading';
import dynamic from 'next/dynamic';

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
