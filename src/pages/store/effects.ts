import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from 'HttpClient';
import store from './store';
import { localeSlice, pricesSlice, serviceDescriptionsSlice } from './reducers';
import { IPriceList, IServiceDescs, ITranslations } from 'p@/common-types/common-types';

export const getLocale = createAsyncThunk('locale/get', async (region: string) => {
	const httpClient = new HttpClient();
	console.log('sending request');
	const response = await httpClient.getTranslations(region).catch((error: Error) => {
		store.dispatch(localeSlice.actions.getLocaleError({ error: error }));
		return;
	});
	console.log('locale response', response);
	store.dispatch(localeSlice.actions.getLocaleSuccess({ locale: response as ITranslations }));
});
export const getServiceDescriptions = createAsyncThunk(
	'serviceDescriptions/get',
	async (region: string) => {
		const httpClient = new HttpClient();
		console.log('sending request');
		const response = await httpClient.getServiceDescriptions(region).catch((error: Error) => {
			store.dispatch(
				serviceDescriptionsSlice.actions.getServiceDescriptionsError({ error: error })
			);
			return;
		});
		console.log('sd response', response);
		store.dispatch(
			serviceDescriptionsSlice.actions.getServiceDescriptionsSuccess({
				serviceDescriptions: response as IServiceDescs,
			})
		);
	}
);
export const getPrices = createAsyncThunk('prices/get', async (paths: string[]) => {
	const httpClient = new HttpClient();
	console.log('sending request');
	const response = await httpClient.getPrices(paths).catch((error: Error) => {
		store.dispatch(pricesSlice.actions.getPricesError({ error: error }));
		return;
	});
	console.log('sd response', response);
	store.dispatch(
		pricesSlice.actions.getPricesSuccess({
			prices: response as IPriceList,
		})
	);
});
