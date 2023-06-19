import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from 'HttpClient';
import store from './store';
import { flyerSlice, pricesSlice, tabsSlice } from './reducers';
import { IFlyer, IPriceList, ITabList, ITranslations } from 'p@/common-types/common-types';

export const getFlyers = createAsyncThunk<void, { language: string }>(
	'flyers',
	async ({ language }) => {
		const httpClient = new HttpClient();
		const response = await httpClient.getFlyers(language).catch((error: Error) => {
			store.dispatch(flyerSlice.actions.getFlyersError({ error }));
			return;
		});
		store.dispatch(
			flyerSlice.actions.getFlyersSuccess({
				flyers: response as IFlyer[],
			})
		);
	}
);
export const getPrices = createAsyncThunk<void, { paths: string[]; language: string }>(
	'prices/get',
	async ({ paths, language }) => {
		const httpClient = new HttpClient();
		const response = await httpClient.getPrices(paths, language).catch((error: Error) => {
			store.dispatch(pricesSlice.actions.getPricesError({ error }));
			return;
		});
		store.dispatch(
			pricesSlice.actions.getPricesSuccess({
				prices: response as IPriceList,
			})
		);
	}
);
export const getTabs = createAsyncThunk<void, { login: string | undefined }>(
	'tabs/get',
	async ({ login }) => {
		const httpClient = new HttpClient();
		const response = await httpClient.getPaths().catch((error: Error) => {
			store.dispatch(tabsSlice.actions.getTabsError({ error }));
			return;
		});
		store.dispatch(
			tabsSlice.actions.getTabsSuccess({
				tabs: response as ITabList,
			})
		);
	}
);
