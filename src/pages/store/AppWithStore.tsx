import * as Components from 'pages/components/index';
import { ITranslations } from 'p@/common-types/common-types';
import { TabMapKeys, unrenderedBuyButtons } from 'pages/components/AppTabs/tabs';
import Loading from 'pages/elements/loading/Loading';
import Logo from 'pages/elements/smallLogo/Logo';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getLocale, getPrices, getServiceDescriptions } from './effects';
import { selectLocale } from './selectors';
import store from './store';

export default function AppWithStore() {
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);
	const translations = useSelector(selectLocale);

	useEffect(() => {
		store.dispatch(getLocale(navigator.language));
		store.dispatch(getServiceDescriptions(navigator.language));
		store.dispatch(
			getPrices(TabMapKeys.filter((TabMapKey) => !unrenderedBuyButtons.hasOwnProperty(TabMapKey)))
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
							tabTranslations={translations.tabs}
						/>
					}
				/>
			)}
			{translations ? (
				<div>
					<div className='padded-page'>
						<Components.AppTabsOutlet translations={translations} />
					</div>
					<Components.AppFooter tabLinks={TabMapKeys} />
				</div>
			) : (
				<Loading pageSuspense={true} />
			)}
		</BrowserRouter>
	);
}
