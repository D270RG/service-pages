import { cartSlice, ICartItem, IPriceList } from '@/app/store/reducers';
import React from 'react';
import './PriceTable.scss';
import serviceDescriptions from 'p@/descriptions/serviceDescriptions.json';
import translations from 'p@/descriptions/translations.json';
import { Button } from 'react-bootstrap';
import store from '@/app/store/store';
import { Languages } from 'p@/common-types/common-types';

function PriceTable(props: { priceInfo: IPriceList; path: string }) {
	function renderPrices() {
		let prices: JSX.Element[] = [];

		props.priceInfo[props.path].forEach((serviceEntry) => {
			prices.push(
				<tr>
					<td>{serviceDescriptions[serviceEntry.descriptionId].description}</td>
					<td>
						{serviceEntry.price} {serviceEntry.currency}
					</td>
					<td className='d-flex justify-content-center align-items-center'>
						<Button
							className='my-3 btn btn-dark'
							onClick={() => {
								store.dispatch(cartSlice.actions.addItem({ cartItem: serviceEntry }));
							}}>
							{translations[Languages.ru].general.order}
						</Button>
					</td>
				</tr>
			);
		});
		return prices;
	}
	return (
		<table className='table'>
			<thead>
				<tr>
					<th>Название</th>
					<th>Цена</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{renderPrices()}</tbody>
		</table>
	);
}

export default PriceTable;
