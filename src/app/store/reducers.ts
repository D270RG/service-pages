import { current, createEntityAdapter, createSlice, configureStore } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Currency, ServiceType } from 'p@/common-types/common-types';

//----------------------------------
interface AddCartItemPayload {
	cartItem: ICartItem;
}
interface DeleteCartItemPayload {
	cartItem: ICartItem;
}
interface AmountPlusPayload {
	id: string;
	amount: number;
}
interface AmountMinusPayload {
	id: string;
	amount: number;
}
//----------------------------------
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
export const cartAdapter = createEntityAdapter<ICartItem>({
	// Assume IDs are stored in a field other than `item.id`
	selectId: (item) => item.id,
	// Keep the "all IDs" array sorted based on ids
	sortComparer: (a, b) => a.type.localeCompare(b.type),
});
//----------------------------------
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
			if (state.ids.includes(action.payload.cartItem.id)) {
				cartAdapter.removeOne(state, action.payload.cartItem.id);
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
