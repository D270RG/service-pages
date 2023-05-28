import React, { useEffect, useState } from 'react';
import { Tab } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router';
import { TabMap, TabMapKeys, TabMapValues, unrenderedBuyButtons, unrenderedTitles } from './tabs';
import './AppTabs.scss';
import {
	ICurrencyTranslations,
	IGeneralTranslations,
	ITabTranslation,
	ITranslations,
} from 'p@/common-types/common-types';
import PriceTable from 'pages/elements/priceTable/PriceTable';
import { HttpClient } from 'HttpClient';
import Loading from 'pages/elements/loading/Loading';
import NotFound from 'pages/elements/NotFound/NotFound';
import { useSelector } from 'react-redux';
import { selectPrices } from 'pages/store/selectors';

function AppTabsContent(props: { translations: ITranslations }) {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const prices = useSelector(selectPrices);

	useEffect(() => {
		renderTabs();
	}, [prices]);

	function renderTabs() {
		const tabs: JSX.Element[] = [];
		TabMap.forEach(
			(
				ComponentValue: React.LazyExoticComponent<
					React.FunctionComponent<{
						tabTranslate: ITabTranslation;
						generalTranslate: IGeneralTranslations;
						currencyTranslate: ICurrencyTranslations;
					}>
				>,
				pathKey
			) => {
				tabs.push(
					<Route
						path={`${pathKey}`}
						element={
							props.translations && (
								<React.Suspense fallback={<Loading pageSuspense={true} />}>
									{!unrenderedTitles.hasOwnProperty(pathKey) && (
										<div>
											<h2 className='title mt-3 mb-2'>{props.translations.tabs[pathKey].title}</h2>
										</div>
									)}
									<ComponentValue
										tabTranslate={props.translations.tabs[pathKey]}
										generalTranslate={props.translations.general}
										currencyTranslate={props.translations.currencies}
									/>
									{prices
										? prices.hasOwnProperty(pathKey) && (
												<PriceTable
													priceInfo={prices}
													path={pathKey}
													generalTranslations={props.translations.general}
													currencyTranslations={props.translations.currencies}
												/>
										  )
										: !unrenderedBuyButtons.hasOwnProperty(pathKey) && (
												<div className='text-muted mt-3'>
													{props.translations.general.noPriceData}
												</div>
										  )}
								</React.Suspense>
							)
						}></Route>
				);
			}
		);
		tabs.push(
			<Route
				path='*'
				element={
					<Navigate
						to='/'
						replace
					/>
				}
			/>
		);
		setTabs(tabs);
		console.log('LOC', location.pathname.split('/')[1], TabMapKeys);
	}
	useEffect(() => {
		console.log('LOC', location.pathname.split('/')[1], TabMapKeys);
	}, [location.pathname]);
	return (
		<Tab.Container
			defaultActiveKey={'/'}
			activeKey={location.pathname
				.replace(/\/$/, '')
				.slice(
					location.pathname.replace(/\/$/, '').lastIndexOf('/') + 1,
					location.pathname.replace(/\/$/, '').length
				)}>
			<Tab.Content>
				<Routes>{tabs}</Routes>
			</Tab.Content>
		</Tab.Container>
	);
}

export default AppTabsContent;
