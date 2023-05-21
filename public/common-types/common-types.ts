export enum Languages {
	ru = 'ru',
	en = 'en',
}
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
	descriptionId: string;
}
export interface IPriceList {
	[path: string]: ICartItem[];
}
export interface IServiceDescs {
	[key: string]: {
		name: string;
		description: string;
	};
}

export interface IFlyer {
	titleId: string;
	textId: string;
	imageId: string;
}
export interface IFlyers {
	[id: string]: IFlyer;
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
export interface ITranslations {
	general: IGeneralTranslations;
	currencies: ICurrencyTranslations;
	tabs: ITabTranslations;
}
