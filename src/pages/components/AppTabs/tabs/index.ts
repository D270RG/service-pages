import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export const Home = React.lazy(() => import('./Home'));
export const Cart = React.lazy(() => import('./Cart'));
export const FirstHelp = React.lazy(() => import('./FirstHelp'));
export const LaptopRepair = React.lazy(() => import('./LaptopRepair'));
export const PhoneRepair = React.lazy(() => import('./PhoneRepair'));

export const TabMap: Map<string, React.LazyExoticComponent<React.FunctionComponent<{}>>> = new Map([
	['home', Home],
	['cart', Cart],
	['first-help', FirstHelp],
	['laptop-repair', LaptopRepair],
	['phone-repair', PhoneRepair],
]);
export const TabMapKeys: string[] = Array.from(TabMap.keys());

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
