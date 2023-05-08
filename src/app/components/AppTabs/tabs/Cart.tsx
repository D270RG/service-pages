import translations from 'p@/descriptions/translations.json';
import React, { FunctionComponent, useEffect, useState } from 'react';
import store, { RootState } from '@/app/store/store';
import './tabs.scss';
import { cartSlice, ICartItem } from '@/app/store/reducers';
import { cartSelectors } from '@/app/store/selectors';
import serviceDescriptions from 'p@/descriptions/serviceDescriptions.json';
import { Languages, ServiceType } from 'p@/common-types/common-types';
import { Button } from 'react-bootstrap';

function TabCart(props: { translate: any }) {
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
			//Monocurrency only
			price += cartItem.price;
			lastPriceCurrency = cartItem.currency;
		});
		setPriceCurrency(lastPriceCurrency);
		setPrice(price);
	}, [cartItems]);
	function renderType(type: string): JSX.Element {
		switch (type) {
			case ServiceType.Android: {
				return <i className='bi bi-android2' />;
			}
			case ServiceType.Apple: {
				return <i className='bi bi-apple' />;
			}
			case ServiceType.Windows: {
				return <i className='bi bi-windows' />;
			}
			case ServiceType.Repair: {
				return <i className='bi bi-screwdriver' />;
			}
			default: {
				return <i className='bi bi-screwdriver' />;
			}
		}
	}
	return (
		<div>
			{cartItems.length > 0 ? (
				<div className='mb-3 d-flex justify-content-between'>
					<h3>
						{price} {translations[Languages.ru].currencies[priceCurrency]}
					</h3>
					<Button className='btn btn-dark'>Заказать</Button>
				</div>
			) : (
				<h6 className='text-muted'>Корзина пуста</h6>
			)}
			{cartItems.map((itemEntry) => {
				return (
					<div
						key={itemEntry.id}
						className='cart-entry-container'>
						<div className='typeContainer'>
							<h3 className=''>{renderType(itemEntry.type)} </h3>
						</div>
						<div className='d-flex align-items-start flex-column descriptionContainer'>
							<div>
								<h2>{serviceDescriptions[itemEntry.descriptionId].name}</h2>
							</div>
							<div className='description'>
								{serviceDescriptions[itemEntry.descriptionId].description}
							</div>
						</div>
						<div className='priceContainer'>
							<h2>
								{itemEntry.price} {translations[Languages.ru].currencies[itemEntry.currency]}
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

export default TabCart as FunctionComponent;
