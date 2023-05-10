import React, { useEffect, useState } from 'react';
import { Tab } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { TabMap, TabMapKeys, unrenderedBuyButtons, unrenderedTitles } from './tabs';
import './AppTabs.scss';
import Loading from '@/app/elements/loading/loading';
import { Languages } from 'p@/common-types/common-types';
import translations from 'p@/descriptions/translations.json';
import { IPriceList } from '@/app/store/reducers';
import PriceTable from '@/app/elements/priceTable/PriceTable';
import { serverAddress } from '../../../../server-info';

function AppTabsContent() {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const [prices, setPrices] = useState<IPriceList | undefined>(undefined);
	function getPrices() {
		fetch(`http://${serverAddress}/prices`, {
			mode: 'cors', // no-cors, *cors, same-origin
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(
				TabMapKeys.filter((TabMapKey) => unrenderedBuyButtons.hasOwnProperty(TabMapKey))
			),
		})
			.then((response) => response.json())
			.then((priceData) => {
				setPrices(priceData);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}
	function renderTabs() {
		const tabs: JSX.Element[] = [];
		TabMap.forEach(
			(
				ComponentValue: React.LazyExoticComponent<
					React.FunctionComponent<{ translate: typeof translations.ru.tabs }>
				>,
				pathKey
			) => {
				tabs.push(
					<Route
						path={pathKey}
						element={
							<React.Suspense
								fallback={
									<div className='spinner-cont'>
										<Loading />
									</div>
								}>
								{/*Tab Rendering*/}
								{!unrenderedTitles.hasOwnProperty(pathKey) && (
									<div>
										<h2 className='my-3'>{translations[Languages.ru].tabs[pathKey].title}</h2>
									</div>
								)}
								<ComponentValue translate={translations[Languages.ru].tabs[pathKey]} />
								{prices ? (
									prices.hasOwnProperty(pathKey) && (
										<PriceTable
											priceInfo={prices}
											path={pathKey}
										/>
									)
								) : (
									<div className='text-muted mt-3'>
										{translations[Languages.ru].general.noPriceData}
									</div>
								)}
								{/*/Tab Rendering*/}
							</React.Suspense>
						}></Route>
				);
			}
		);
		setTabs(tabs);
	}
	useEffect(() => {
		renderTabs();
	}, [prices]);
	useEffect(() => {
		getPrices();
		renderTabs();
	}, []);
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
