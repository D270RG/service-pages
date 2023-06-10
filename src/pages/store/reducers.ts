import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, IPriceList, ITabList, ITranslations } from 'p@/common-types/common-types';

//----------------------------------payload interfaces
interface LoggedInPayload {
	login: string | undefined;
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

interface PricesActionPayload {
	prices?: IPriceList;
	error?: Error;
}

interface TabsActionPayload {
	tabs?: ITabList;
	error?: Error;
}

interface FormActionPayload {
	visible: boolean;
}

//----------------------------------states
interface ILoggedInInitialState {
	login: string | undefined;
}
interface IFormInitialState {
	visible: boolean;
}
interface IPricesInitialState {
	prices: IPriceList | undefined;
	error?: Error;
}
interface ITabsInitialState {
	tabs: ITabList | undefined;
	error?: Error;
}
export const loggedInInitialState: ILoggedInInitialState = {
	login: undefined,
};
export const pricesInitialState: IPricesInitialState = {
	prices: undefined,
	error: undefined,
};
export const formInitialState: IFormInitialState = {
	visible: false,
};
export const tabsInitialState: ITabsInitialState = {
	tabs: {},
	error: undefined,
};

export const cartAdapter = createEntityAdapter<ICartItem>({
	// Assume IDs are stored in a field other than `item.id`
	selectId: (item) => item.id,
	// Keep the "all IDs" array sorted based on ids
	sortComparer: (a, b) => a.type.localeCompare(b.type),
});
//----------------------------------reducer
export const loggedInSlice = createSlice({
	name: 'loggedIn',
	initialState: loggedInInitialState,
	reducers: {
		setLoggedState(state, action: PayloadAction<LoggedInPayload>) {
			state.login = action.payload.login;
		},
	},
});
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
export const pricesSlice = createSlice({
	name: 'prices',
	initialState: pricesInitialState,
	reducers: {
		getPricesSuccess(state, action: PayloadAction<PricesActionPayload>) {
			state.prices = action.payload.prices;
		},
		getPricesError(state, action: PayloadAction<PricesActionPayload>) {
			state.error = action.payload.error;
		},
	},
});
export const formSlice = createSlice({
	name: 'form',
	initialState: formInitialState,
	reducers: {
		setVisibility(state, action: PayloadAction<FormActionPayload>) {
			state.visible = action.payload.visible;
			console.log(state.visible);
		},
	},
});
export const tabsSlice = createSlice({
	name: 'tabs',
	initialState: tabsInitialState,
	reducers: {
		getTabsSuccess(state, action: PayloadAction<TabsActionPayload>) {
			state.tabs = action.payload.tabs;
		},
		getTabsError(state, action: PayloadAction<TabsActionPayload>) {
			state.error = action.payload.error;
		},
	},
});
