import { cartAdapter } from './reducers';
import { RootState } from './store';

export const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state.cartReducer);
export const selectPrices = (state: RootState) => state.pricesReducer.prices;
export const selectFormVisibility = (state: RootState) => state.formReducer.visible;
