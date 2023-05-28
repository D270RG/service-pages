import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from 'HttpClient';
import store from './store';
import { pricesSlice } from './reducers';
import { IPriceList, ITranslations } from 'p@/common-types/common-types';

export const getPrices = createAsyncThunk<void, { paths: string[]; language: string }>(
	'prices/get',
	async ({ paths, language }) => {
		const httpClient = new HttpClient();
		console.log('sending request');
		const response = await httpClient.getPrices(paths, language).catch((error: Error) => {
			store.dispatch(pricesSlice.actions.getPricesError({ error: error }));
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
