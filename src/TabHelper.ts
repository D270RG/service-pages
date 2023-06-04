import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './tabs.scss';
import { ITabList } from 'p@/common-types/common-types';

export function mapTabObjects(
	tabObject: ITabList
): Map<string, React.LazyExoticComponent<React.FunctionComponent<{}>>> {
	const TabMap: Map<string, React.LazyExoticComponent<React.FunctionComponent<{}>>> = new Map([]);
	Object.keys(tabObject).forEach((tabKey) => {
		console.log('importing', tabKey);
		TabMap.set(
			tabObject[tabKey],
			React.lazy(() => import(`./${tabKey}.tsx`))
		);
	});
	return TabMap;
}

export const unrenderedTabs = {
	home: true,
	cart: true,
};
export const unrenderedTitles = {
	home: true,
};
export const unrenderedBuyButtons = {
	home: true,
	cart: true,
};
