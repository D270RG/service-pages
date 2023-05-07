import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './reducers';
let store = configureStore({
	reducer: {
		cartReducer: cartSlice.reducer,
	},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
