import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	Currency,
	ICartItem,
	IPriceList,
	IServiceDescs,
	ITranslations,
	ServiceType,
} from 'p@/common-types/common-types';

//----------------------------------payload interfaces
interface LocaleActionPayload {
	locale?: ITranslations;
	error?: Error;
}

interface AddCartItemPayload {
	cartItem: ICartItem;
}
interface DeleteCartItemPayload {
	id: string;
}
interface AmountPlusPayload {
	id: string;
	amount: number;
}
interface AmountMinusPayload {
	id: string;
	amount: number;
}

interface ServiceDescriptionsActionPayload {
	serviceDescriptions?: IServiceDescs;
	error?: Error;
}

interface PricesActionPayload {
	prices?: IPriceList;
	error?: Error;
}
//----------------------------------states
interface ILocaleInitialState {
	locale: ITranslations | undefined;
	error?: Error;
}
interface IServiceDescriptionsInitialState {
	serviceDescriptions: IServiceDescs | undefined;
	error?: Error;
}
interface IPricesInitialState {
	prices: IPriceList | undefined;
	error?: Error;
}
export const localeInitialState: ILocaleInitialState = {
	locale: undefined,
	error: undefined,
};
export const serviceDescriptionsInitialState: IServiceDescriptionsInitialState = {
	serviceDescriptions: undefined,
	error: undefined,
};
export const pricesInitialState: IPricesInitialState = {
	prices: undefined,
	error: undefined,
};

export const cartAdapter = createEntityAdapter<ICartItem>({
	// Assume IDs are stored in a field other than `item.id`
	selectId: (item) => item.id,
	// Keep the "all IDs" array sorted based on ids
	sortComparer: (a, b) => a.type.localeCompare(b.type),
});
//----------------------------------reducer
export const cartSlice = createSlice({
	name: 'cartItems',
	initialState: cartAdapter.getInitialState(),
	reducers: {
		addItem(state, action: PayloadAction<AddCartItemPayload>) {
			if (!state.ids.includes(action.payload.cartItem.id)) {
				cartAdapter.addOne(state, action.payload.cartItem);
			}
		},
		removeItem(state, action: PayloadAction<DeleteCartItemPayload>) {
			if (state.ids.includes(action.payload.id)) {
				cartAdapter.removeOne(state, action.payload.id);
			}
		},
		amountPlus(state, action: PayloadAction<AmountPlusPayload>) {
			let cartItem = state.entities[action.payload.id] as ICartItem;
			cartAdapter.setOne(state, {
				...cartItem,
				amount: cartItem.amount + action.payload.amount,
			});
		},
		amountMinus(state, action: PayloadAction<AmountMinusPayload>) {
			let cartItem = state.entities[action.payload.id] as ICartItem;
			if (cartItem.amount - action.payload.amount >= 0) {
				cartAdapter.removeOne(state, action.payload.id);
			} else {
				cartAdapter.setOne(state, {
					...cartItem,
					amount: cartItem.amount - action.payload.amount,
				});
			}
		},
	},
});
export const localeSlice = createSlice({
	name: 'locale',
	initialState: localeInitialState,
	reducers: {
		getLocaleSuccess(state, action: PayloadAction<LocaleActionPayload>) {
			console.log('get locale success');
			state.locale = action.payload.locale;
		},
		getLocaleError(state, action: PayloadAction<LocaleActionPayload>) {
			state.error = action.payload.error;
		},
	},
});
export const serviceDescriptionsSlice = createSlice({
	name: 'serviceDescriptions',
	initialState: serviceDescriptionsInitialState,
	reducers: {
		getServiceDescriptionsSuccess(state, action: PayloadAction<ServiceDescriptionsActionPayload>) {
			state.serviceDescriptions = action.payload.serviceDescriptions;
		},
		getServiceDescriptionsError(state, action: PayloadAction<ServiceDescriptionsActionPayload>) {
			state.error = action.payload.error;
		},
	},
});
export const pricesSlice = createSlice({
	name: 'prices',
	initialState: pricesInitialState,
	reducers: {
		getPricesSuccess(state, action: PayloadAction<PricesActionPayload>) {
			console.log('get prices success');
			state.prices = action.payload.prices;
		},
		getPricesError(state, action: PayloadAction<PricesActionPayload>) {
			state.error = action.payload.error;
		},
	},
});
