import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, localeSlice } from './reducers';
let store = configureStore({
	reducer: {
		cartReducer: cartSlice.reducer,
		localeReducer: localeSlice.reducer,
	},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
