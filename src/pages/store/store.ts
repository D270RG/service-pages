import { configureStore } from '@reduxjs/toolkit';
import {
	cartSlice,
	flyerSlice,
	formSlice,
	loggedInSlice,
	pricesSlice,
	tabsSlice,
} from './reducers';
let store = configureStore({
	reducer: {
		flyerReducer: flyerSlice.reducer,
		tabsReducer: tabsSlice.reducer,
		cartReducer: cartSlice.reducer,
		pricesReducer: pricesSlice.reducer,
		formReducer: formSlice.reducer,
		loggedInReducer: loggedInSlice.reducer,
	},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
