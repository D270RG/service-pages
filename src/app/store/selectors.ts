import { useSelector } from 'react-redux';
import { cartAdapter } from './reducers';
import store, { RootState } from './store';

export const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state.cartReducer);
