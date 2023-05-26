import * as Components from 'pages/components/index';
import { ITranslations } from 'p@/common-types/common-types';
import { TabMapKeys } from 'pages/components/AppTabs/tabs';
import Loading from 'pages/elements/loading/Loading';
import Logo from 'pages/elements/smallLogo/Logo';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getLocale } from './effects';
import { selectLocale } from './selectors';
import store from './store';

function SafeHydrate({ children }: { children: JSX.Element | JSX.Element[] }) {
	return (
		<div suppressHydrationWarning={true}>{typeof window === 'undefined' ? null : children}</div>
	);
}
export default function AppWithStore() {
	const [dropdownItems, setDropdownItems] = useState<JSX.Element[]>([]);
	const [translations, setTranslations] = useState<ITranslations | undefined>(undefined);
	const locale = useSelector(selectLocale);

	useEffect(() => {
		store.dispatch(getLocale(navigator.language));
	}, []);
	useEffect(() => {
		console.log('setting locale', locale);
		setTranslations(locale);
	}, [locale]);
	return (
		<SafeHydrate>
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
		</SafeHydrate>
	);
}
