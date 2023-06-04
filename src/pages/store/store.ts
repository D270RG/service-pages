import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, formSlice, pricesSlice, tabsSlice } from './reducers';
let store = configureStore({
	reducer: {
		tabsReducer: tabsSlice.reducer,
		cartReducer: cartSlice.reducer,
		pricesReducer: pricesSlice.reducer,
		formReducer: formSlice.reducer,
	},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
