import { cartAdapter } from './reducers';
import { RootState } from './store';

export const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state.cartReducer);
export const selectLocale = (state: RootState) => state.localeReducer.locale;
export const selectServiceDescriptions = (state: RootState) =>
	state.serviceDescriptionsReducer.serviceDescriptions;
export const selectPrices = (state: RootState) => state.pricesReducer.prices;
