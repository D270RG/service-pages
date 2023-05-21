import React, { useEffect, useState } from 'react';
import { Tab } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { TabMap, TabMapKeys, unrenderedBuyButtons, unrenderedTitles } from './tabs';
import './AppTabs.scss';
import Loading from 'pages/elements/loading/loading';
import {
	ICurrencyTranslations,
	IGeneralTranslations,
	IPriceList,
	IServiceDescs,
	ITabTranslation,
	ITabTranslations,
	ITranslations,
	Languages,
} from 'p@/common-types/common-types';
import PriceTable from 'pages/elements/priceTable/PriceTable';
import { HttpClient } from 'HttpClient';

function AppTabsContent(props: { translations: ITranslations }) {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const [prices, setPrices] = useState<IPriceList | undefined>(undefined);
	const [serviceDescriptions, setServiceDescriptions] = useState<IServiceDescs | undefined>(
		undefined
	);
	const httpClient = new HttpClient();

	useEffect(() => {
		renderTabs();
	}, [prices, serviceDescriptions]);
	useEffect(() => {
		fetchServiceDescs();
		fetchPrices();
		renderTabs();
	}, []);
	function fetchServiceDescs() {
		httpClient.getServiceDescriptions().then((serviceDescs) => {
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
				tabs.push(
					<Route
						path={pathKey}
						element={
							props.translations && (
								<React.Suspense
									fallback={
										<div className='spinner-cont'>
											<Loading />
										</div>
									}>
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
	}
	return (
		<Tab.Container
			defaultActiveKey={'/'}
			activeKey={location.pathname.slice(
				location.pathname.lastIndexOf('/') + 1,
				location.pathname.length
			)}>
			<Tab.Content>
				<Routes>{tabs}</Routes>
			</Tab.Content>
		</Tab.Container>
	);
}

export default AppTabsContent;
