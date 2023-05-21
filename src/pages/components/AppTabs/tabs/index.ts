import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { PathKeys, TabPaths } from 'p@/descriptions/TabMap';
import './tabs.scss';

export const TabMap: Map<string, React.LazyExoticComponent<React.FunctionComponent<{}>>> = new Map(
	[]
);
PathKeys.forEach((pathKey: string) => {
	console.log('importing', pathKey);
	TabMap.set(
		TabPaths[pathKey],
		React.lazy(() => import(`./${pathKey}.tsx`))
	);
});
console.log(TabMap);
export const TabMapKeys = Array.from(TabMap.keys());
console.log(TabMap);

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
