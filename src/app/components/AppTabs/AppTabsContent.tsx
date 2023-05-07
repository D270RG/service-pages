import React, { useEffect, useState } from 'react';
import { Tab } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { IndexTab, TabMap } from './tabs';
import './AppTabs.scss';
function AppTabsContent() {
	const [tabs, setTabs] = useState<JSX.Element[]>([]);
	const fallbackRoute = (
		<Route
			path='/fallback'
			element={<div>fallback</div>}
		/>
	);
	useEffect(() => {
		const tabs: JSX.Element[] = [];
		tabs.push(
			<Route
				index
				element={<IndexTab />}></Route>
		);
		TabMap.forEach((ComponentValue, pathKey) => {
			tabs.push(
				<Route
					path={pathKey}
					element={
						<React.Suspense fallback={<div>Loading</div>}>
							<ComponentValue />
						</React.Suspense>
					}></Route>
			);
		});
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
