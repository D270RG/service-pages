import * as Components from 'pages/components/index';
import { ITranslations } from 'p@/common-types/common-types';
import { TabMapKeys, unrenderedBuyButtons } from 'pages/components/AppTabs/tabs';
import Loading from 'pages/elements/loading/Loading';
import Logo from 'pages/elements/smallLogo/Logo';
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getPrices } from './effects';
import store from './store';
import translations from 'p@/descriptions/translations.json';
export default function AppWithStore() {
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);

	useEffect(() => {
		store.dispatch(
			getPrices({
				paths: TabMapKeys.filter((TabMapKey) => !unrenderedBuyButtons.hasOwnProperty(TabMapKey)),
				language: navigator.language,
			})
		);
	}, []);
	return (
		<BrowserRouter>
			{translations && (
				<Components.AppHeader
					logoElement={<Logo />}
					dropdownItems={dropdownItems}
					navElement={
						<Components.AppTabsNavigation
							setDropdownItems={(items) => {
								console.log('set dropdownItems');
								setDropdownItems(items);
							}}
							tabTranslations={translations[navigator.language].tabs}
						/>
					}
				/>
			)}
			{translations ? (
				<div>
					<div className='padded-page'>
						<Components.AppTabsOutlet translations={translations[navigator.language]} />
					</div>
					<Components.AppFooter tabLinks={TabMapKeys} />
				</div>
			) : (
				<Loading pageSuspense={true} />
			)}
		</BrowserRouter>
	);
}
