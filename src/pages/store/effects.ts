import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from 'HttpClient';
import store from './store';
import { localeSlice } from './reducers';
import { ITranslations } from 'p@/common-types/common-types';

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
