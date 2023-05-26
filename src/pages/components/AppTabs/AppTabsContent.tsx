import React, { useEffect, useState } from 'react';
import { Tab } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { TabMap, TabMapKeys, TabMapValues, unrenderedBuyButtons, unrenderedTitles } from './tabs';
import './AppTabs.scss';
import {
	ICurrencyTranslations,
	IGeneralTranslations,
	IPriceList,
	IServiceDescs,
	ITabTranslation,
	ITranslations,
} from 'p@/common-types/common-types';
import PriceTable from 'pages/elements/priceTable/PriceTable';
import { HttpClient } from 'HttpClient';
import Loading from 'pages/elements/loading/Loading';
import NotFound from 'pages/elements/NotFound/NotFound';

function AppTabsContent(props: { translations: ITranslations }) {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const [prices, setPrices] = useState<IPriceList | undefined>(undefined);
	const [serviceDescriptions, setServiceDescriptions] = useState<IServiceDescs | undefined>(
		undefined
	);
	const httpClient = new HttpClient();

	useEffect(() => {
		renderTabs();
		console.log('service descs change', serviceDescriptions);
	}, [prices, serviceDescriptions]);
	useEffect(() => {
		fetchServiceDescs();
		fetchPrices();
	}, []);
	function fetchServiceDescs() {
		httpClient.getServiceDescriptions(navigator.language).then((serviceDescs) => {
			console.log('setting serviceDescs', serviceDescs);
			setServiceDescriptions(serviceDescs);
		});
	}
	function fetchPrices() {
		httpClient
			.getPrices(TabMapKeys.filter((TabMapKey) => !unrenderedBuyButtons.hasOwnProperty(TabMapKey)))
			.then((priceData) => {
				console.log('price data', priceData);
				const asArray = Object.entries(priceData);
				const filtered = asArray.filter(([key, value]) => {
					return !unrenderedBuyButtons.hasOwnProperty(key);
				});
				setPrices(Object.fromEntries(filtered));
			});
	}
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
				console.log('content translations', props.translations);
				console.log('pathkey', pathKey);
				console.log(
					'prices',
					prices,
					'serviceDescs',
					serviceDescriptions,
					'ownProperty',
					pathKey,
					prices?.hasOwnProperty(pathKey) && serviceDescriptions
				);
				tabs.push(
					<Route
						path={`${pathKey}/*`}
						element={
							props.translations && (
								<React.Suspense fallback={<Loading />}>
									{!unrenderedTitles.hasOwnProperty(pathKey) && (
										<div>
											<h2 className='my-3'>{props.translations.tabs[pathKey].title}</h2>
										</div>
									)}
									<ComponentValue
										tabTranslate={props.translations.tabs[pathKey]}
										generalTranslate={props.translations.general}
										currencyTranslate={props.translations.currencies}
									/>
									{prices
										? prices.hasOwnProperty(pathKey) &&
										  serviceDescriptions && (
												<PriceTable
													priceInfo={prices}
													path={pathKey}
													serviceDescriptions={serviceDescriptions}
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
		setTabs(tabs);
		console.log('LOC', location.pathname.split('/')[1], TabMapKeys);
	}
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
				{!TabMapKeys.includes(location.pathname.split('/')[1]) && <NotFound />}
			</Tab.Content>
		</Tab.Container>
	);
}

export default AppTabsContent;
