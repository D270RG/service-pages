import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, pricesSlice } from './reducers';
let store = configureStore({
	reducer: {
		cartReducer: cartSlice.reducer,
		pricesReducer: pricesSlice.reducer,
	},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
