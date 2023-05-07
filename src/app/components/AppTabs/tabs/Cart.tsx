import translations from 'p@/descriptions/translations.json';
import React, { FunctionComponent, useEffect, useState } from 'react';
import store, { RootState } from '@/app/store/store';
import './tabs.scss';
import { ICartItem } from '@/app/store/reducers';
import { cartSelectors } from '@/app/store/selectors';
import serviceDescriptions from 'p@/descriptions/serviceDescriptions.json';

function TabCart(props: { translate: any }) {
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	useEffect(() => {
		setCartItems(cartSelectors.selectAll(store.getState()));
	}, []);
	return (
		<div>
			{cartItems.map((itemEntry) => {
				return (
					<div
						key={itemEntry.id}
						className='cart-entry-container'>
						<h2>{serviceDescriptions[itemEntry.descriptionId].name}</h2>
						<div>{serviceDescriptions[itemEntry.descriptionId].description}</div>
						<div>
							{itemEntry.price} {itemEntry.currency}
						</div>
						<div>{itemEntry.type}</div>
					</div>
				);
			})}
		</div>
	);
}

export default TabCart as FunctionComponent;
