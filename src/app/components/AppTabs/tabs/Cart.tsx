import translations from 'p@/descriptions/translations.json';
import React, { FunctionComponent, useEffect, useState } from 'react';
import store, { RootState } from '@/app/store/store';
import './tabs.scss';
import { ICartItem } from '@/app/store/reducers';
import { cartSelectors } from '@/app/store/selectors';
import serviceDescriptions from 'p@/descriptions/serviceDescriptions.json';
import { ServiceType } from 'p@/common-types/common-types';

function TabCart(props: { translate: any }) {
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	useEffect(() => {
		setCartItems(cartSelectors.selectAll(store.getState()));
	}, []);
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
			{cartItems.map((itemEntry) => {
				return (
					<div
						key={itemEntry.id}
						className='cart-entry-container'>
						<div className='typeContainer'>
							<h3 className=''>{renderType(itemEntry.type)}</h3>
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
								{itemEntry.price} {itemEntry.currency}
							</h2>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TabCart as FunctionComponent;
