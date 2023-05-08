import React, { useEffect, useState } from 'react';
import { Tab } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { TabMap, unrenderedTitles } from './tabs';
import './AppTabs.scss';
import Loading from '@/app/elements/loading/loading';
import { Languages } from 'p@/common-types/common-types';
import translations from 'p@/descriptions/translations.json';
import { IPriceList } from '@/app/store/reducers';
import PriceTable from '@/app/elements/priceTable/PriceTable';

function AppTabsContent() {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const fallbackRoute = (
		<Route
			path='/fallback'
			element={<Loading />}
		/>
	);
	useEffect(() => {
		const tabs: JSX.Element[] = [];
		//Here will be pricelist fetch
		const examplePriceRequest = {}; //GET with all TabMap keys
		const examplePriceListResponse = {
			'first-help': [
				{ id: '123', type: 'Repair', price: 10, currency: 'rub', amount: 1, descriptionId: '123' },
				{
					id: '1234',
					type: 'Repair',
					price: 100,
					currency: 'rub',
					amount: 1,
					descriptionId: '1234',
				},
				{
					id: '12345',
					type: 'Repair',
					price: 1000,
					currency: 'rub',
					amount: 1,
					descriptionId: '12345',
				},
			],
			'laptop-repair': [
				{
					id: '456',
					type: 'Windows',
					price: 1000,
					currency: 'rub',
					amount: 1,
					descriptionId: '456',
				},
				{
					id: '4567',
					type: 'Windows',
					price: 100000,
					currency: 'rub',
					amount: 1,
					descriptionId: '4567',
				},
			],
			'phone-repair': [
				{
					id: '789',
					type: 'Android',
					price: 300,
					currency: 'rub',
					amount: 1,
					descriptionId: '789',
				},
				{
					id: '78910',
					type: 'Android',
					price: 200,
					currency: 'rub',
					amount: 1,
					descriptionId: '78910',
				},
				{
					id: '7891011',
					type: 'Android',
					price: 11,
					currency: 'rub',
					amount: 1,
					descriptionId: '7891011',
				},
				{
					id: '789101112',
					type: 'Android',
					price: 10000,
					currency: 'rub',
					amount: 1,
					descriptionId: '789101112',
				},
			],
		} as unknown as IPriceList;

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
								{examplePriceListResponse.hasOwnProperty(pathKey) && (
									<PriceTable
										priceInfo={examplePriceListResponse}
										path={pathKey}
									/>
								)}
								{/*/Tab Rendering*/}
							</React.Suspense>
						}></Route>
				);
			}
		);
		setTabs(tabs);
	}, []);
	return (
		<Tab.Container
			defaultActiveKey={'/'}
			activeKey={location.pathname.slice(
				location.pathname.lastIndexOf('/') + 1,
				location.pathname.length
			)}>
			<Tab.Content>
				<Routes>{tabs.length > 0 ? tabs : fallbackRoute}</Routes>
			</Tab.Content>
		</Tab.Container>
	);
}

export default AppTabsContent;
