import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export const TabHome = React.lazy(() => import('./Home'));
export const FirstHelp = React.lazy(() => import('./FirstHelp'));
export const LaptopRepair = React.lazy(() => import('./LaptopRepair'));
export const PhoneRepair = React.lazy(() => import('./PhoneRepair'));

export const IndexTab = TabHome;
export const TabMap: Map<string, React.LazyExoticComponent<React.FunctionComponent<{}>>> = new Map([
	['first-help', FirstHelp],
	['laptop-repair', LaptopRepair],
	['phone-repair', PhoneRepair],
]);
export const TabTranslates = {
	'first-help': 'Первая помощь',
	'laptop-repair': 'Ремонт ноутбуков',
	'phone-repair': 'Ремонт телефонов',
};
