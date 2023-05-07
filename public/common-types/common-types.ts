import translations from '../descriptions/translations.json';
export enum Languages {
	ru = 'ru',
	en = 'en',
}
export enum Currency {
	rub = 'руб',
	usd = 'usd',
}
export enum ServiceType {
	Android = 'Android',
	Apple = 'Apple',
	Windows = 'Windows',
	Repair = 'Repair',
}
export type translateObject = typeof translations;
