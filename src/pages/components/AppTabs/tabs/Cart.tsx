import React, { FunctionComponent, useEffect, useState } from 'react';
import store from 'pages/store/store';
import { cartSlice } from 'pages/store/reducers';
import { cartSelectors } from 'pages/store/selectors';
import { ICartItem, ITranslations } from 'p@/common-types/common-types';
import { Button } from 'react-bootstrap';
import TypeContainer from 'pages/elements/typeContainer/TypeContainer';

function Cart(props: { translations: ITranslations; pathKey: string }) {
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	const [price, setPrice] = useState<number | undefined>(undefined);
	const [priceCurrency, setPriceCurrency] = useState<string>('');
	useEffect(() => {
		setCartItems(cartSelectors.selectAll(store.getState()));
	}, []);
	useEffect(() => {
		let price = 0;
		let lastPriceCurrency = '';
		cartItems.forEach((cartItem) => {
			price += cartItem.price;
			lastPriceCurrency = cartItem.currency;
		});
		setPriceCurrency(lastPriceCurrency);
		setPrice(price);
	}, [cartItems]);

	return (
		<div>
			{cartItems.length > 0 ? (
				<div className='mb-3 d-flex justify-content-between'>
					<h3>
						{price} {props.translations.currencies[priceCurrency]}
					</h3>
					<Button className='btn btn-dark'>{props.translations.general.order}</Button>
				</div>
			) : (
				<h6 className='text-muted'>{props.translations.tabs[props.pathKey].texts.isEmpty}</h6>
			)}
			{cartItems.map((itemEntry) => {
				return (
					<div
						key={itemEntry.id}
						className='cart-entry-container'>
						<TypeContainer type={itemEntry.type} />
						<div className='d-flex align-items-start flex-column descriptionContainer'>
							<div>
								<h2>{itemEntry.name}</h2>
							</div>
							<div className='description'>{itemEntry.description}</div>
						</div>
						<div className='priceContainer'>
							<h2>
								{itemEntry.price} {props.translations.currencies[itemEntry.currency]}
							</h2>
						</div>
						<button
							className='btn btn-transparent'
							onClick={() => {
								store.dispatch(cartSlice.actions.removeItem({ id: itemEntry.id }));
								setCartItems(cartSelectors.selectAll(store.getState()));
							}}>
							<i className='bi bi-x-lg'></i>
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Cart as FunctionComponent;
