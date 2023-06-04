export enum Currency {
	rub = 'rub',
	usd = 'usd',
}
export enum ServiceType {
	Android = 'Android',
	Apple = 'Apple',
	Windows = 'Windows',
	Repair = 'Repair',
}

export interface ICartItem {
	id: string;
	type: ServiceType;
	price: number;
	currency: Currency;
	amount: number;
	name: string;
	description: string;
}
export interface IPriceList {
	[path: string]: ICartItem[];
}
export interface ICartItemPayload {
	type: ServiceType;
	price: number;
	currency: Currency;
	amount: number;
	name: string;
	description: string;
	language: string;
}

export interface IFlyer {
	id: string;
	title: string;
	text: string;
	href: string;
}
export interface IFlyers {
	[id: string]: IFlyer;
}
export interface IFlyerPayload {
	title: string;
	text: string;
	href: string;
	language: string;
}

export interface IGeneralTranslations {
	[key: string]: string;
}
export interface ICurrencyTranslations {
	[Currency.rub]: string;
	[Currency.usd]: string;
}
export interface ITabTranslation {
	title: string;
	titles: {
		[titleKey: string]: string;
	};
	texts: {
		[textKey: string]: string;
	};
}
export interface ITabTranslations {
	[tabKey: string]: ITabTranslation;
}
export interface ILoginFormTranslations {
	[key: string]: string;
}
export interface ITranslations {
	general: IGeneralTranslations;
	currencies: ICurrencyTranslations;
	tabs: ITabTranslations;
	loginForm: ILoginFormTranslations;
}

export interface ITabList {
	[component: string]: string;
}

export interface IFlyer {
	id: string;
	href: string;
}
