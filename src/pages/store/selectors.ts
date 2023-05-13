import { cartAdapter } from './reducers';
import { RootState } from './store';

export const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state.cartReducer);
