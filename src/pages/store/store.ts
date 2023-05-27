import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, localeSlice, pricesSlice, serviceDescriptionsSlice } from './reducers';
let store = configureStore({
	reducer: {
		cartReducer: cartSlice.reducer,
		serviceDescriptionsReducer: serviceDescriptionsSlice.reducer,
		pricesReducer: pricesSlice.reducer,
		localeReducer: localeSlice.reducer,
	},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
