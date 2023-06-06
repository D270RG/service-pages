import * as Components from 'pages/components/index';
import { ITabList, ITranslations } from 'p@/common-types/common-types';
import { mapTabObjects, unrenderedBuyButtons } from 'TabHelper';
import Loading from 'pages/elements/loading/Loading';
import Logo from 'pages/elements/smallLogo/Logo';
import { useState, useEffect, createContext, LazyExoticComponent, FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getPrices, getTabs } from './effects';
import store from './store';
import translations from 'p@/descriptions/translations.json';
import ModalForm from 'pages/elements/form/ModalForm';
import { selectFormVisibility, selectTabs } from './selectors';
import { useSelector } from 'react-redux';
import { CookieClient } from 'CookieClient';

export const TabContext = createContext<
	Map<string, LazyExoticComponent<FunctionComponent>> | undefined
>(undefined);

export default function AppWithStore() {
	const cookieClient = new CookieClient();
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);
	const formVisibility = useSelector(selectFormVisibility);
	const tabs = useSelector(selectTabs) || {};
	const tabMap = mapTabObjects(tabs);
	const tabMapKeys = Array.from(tabMap.keys());
	useEffect(() => {
		const login = cookieClient.readCookies['login'];
		console.log('dispatching with', login);
		store.dispatch(getTabs({ login }));
	}, []);
	useEffect(() => {
		console.log('received tabs', tabs);
		if (Object.keys(tabs).length > 0) {
			store.dispatch(
				getPrices({
					paths: tabMapKeys.filter((tabMapKey) => !unrenderedBuyButtons.hasOwnProperty(tabMapKey)),
					language: navigator.language,
				})
			);
		}
	}, [tabs]);
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
							tabMap={tabMap}
							tabTranslations={translations[navigator.language].tabs}
						/>
					}
				/>
			)}
			{translations ? (
				<div>
					<div className='padded-page'>
						<TabContext.Provider value={tabMap}>
							<Components.AppTabsOutlet translations={translations[navigator.language]} />
						</TabContext.Provider>
					</div>
					<Components.AppFooter tabLinks={tabMapKeys} />
					{formVisibility && (
						<ModalForm
							formTranslations={translations[navigator.language].loginForm}
							errorTranslations={translations[navigator.language].errors}
						/>
					)}
				</div>
			) : (
				<Loading pageSuspense={true} />
			)}
		</BrowserRouter>
	);
}
