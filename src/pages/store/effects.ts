import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from 'HttpClient';
import store from './store';
import { pricesSlice, tabsSlice } from './reducers';
import { IPriceList, ITabList, ITranslations } from 'p@/common-types/common-types';

export const getPrices = createAsyncThunk<void, { paths: string[]; language: string }>(
	'prices/get',
	async ({ paths, language }) => {
		const httpClient = new HttpClient();
		console.log('sending request');
		const response = await httpClient.getPrices(paths, language).catch((error: Error) => {
			store.dispatch(pricesSlice.actions.getPricesError({ error }));
			return;
		});
		console.log('sd response', response);
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
		console.log('sending tabs request', login);
		const response = await httpClient.getPaths(login).catch((error: Error) => {
			store.dispatch(tabsSlice.actions.getTabsError({ error }));
			return;
		});
		console.log('tabs response', response);
		store.dispatch(
			tabsSlice.actions.getTabsSuccess({
				tabs: response as ITabList,
			})
		);
	}
);
