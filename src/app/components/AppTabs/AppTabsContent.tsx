import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Tab } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { TabMap, unrenderedBuyButtons, unrenderedTabs, unrenderedTitles } from './tabs';
import './AppTabs.scss';
import Loading from '@/app/elements/loading/loading';
import { Languages } from 'p@/common-types/common-types';
import translations from 'p@/descriptions/translations.json';
import services from 'p@/descriptions/services.json';
import store from '@/app/store/store';
import { cartSlice } from '@/app/store/reducers';

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
			'first-help': {
				id: '123',
				type: 'Apple',
				price: 10000,
				currency: 'rub',
				amount: 1,
				descriptionId: '123',
			},
			'laptop-repair': {
				id: '456',
				type: 'Windows',
				price: 1000,
				currency: 'rub',
				amount: 1,
				descriptionId: '456',
			},
			'phone-repair': {
				id: '789',
				type: 'Android',
				price: 100,
				currency: 'rub',
				amount: 1,
				descriptionId: '789',
			},
		};

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
									<Button
										className='my-3 btn btn-dark'
										onClick={() => {
											store.dispatch(
												cartSlice.actions.addItem({ cartItem: examplePriceListResponse[pathKey] })
											);
										}}>
										{translations[Languages.ru].general.order}
									</Button>
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
