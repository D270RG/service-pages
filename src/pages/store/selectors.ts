import { cartAdapter } from './reducers';
import { RootState } from './store';

export const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state.cartReducer);
export const selectLoggedState = (state: RootState) => state.loggedInReducer.login;
export const selectPrices = (state: RootState) => state.pricesReducer.prices;
export const selectTabs = (state: RootState) => state.tabsReducer.tabs;
export const selectFormVisibility = (state: RootState) => state.formReducer.visible;
