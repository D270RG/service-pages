import { cartSlice, ICartItem, IPriceList } from '@/app/store/reducers';
import React, { useEffect, useState } from 'react';
import './PriceTable.scss';
import serviceDescriptions from 'p@/descriptions/serviceDescriptions.json';
import translations from 'p@/descriptions/translations.json';
import { Button } from 'react-bootstrap';
import store from '@/app/store/store';
import { Languages } from 'p@/common-types/common-types';
import { cartSelectors } from '@/app/store/selectors';

function PriceTable(props: { priceInfo: IPriceList; path: string }) {
	const [disabledIds, setDisabledIds] = useState<string[]>([]);
	useEffect(() => {
		setDisabledIds(cartSelectors.selectIds(store.getState()) as string[]);
	}, []);
	function renderPrices() {
		let prices: JSX.Element[] = [];

		props.priceInfo[props.path].forEach((serviceEntry) => {
			const isDisabled = disabledIds.includes(serviceEntry.id);
			prices.push(
				<tr>
					<td>{serviceDescriptions[serviceEntry.descriptionId].description}</td>
					<td>
						{serviceEntry.price} {translations[Languages.ru].currencies[serviceEntry.currency]}
					</td>
					<td>
						<div className='d-flex justify-content-center align-items-center flex-row flex-wrap'>
							<Button
								className='m-1 btn btn-dark'
								disabled={isDisabled}
								onClick={() => {
									store.dispatch(cartSlice.actions.addItem({ cartItem: serviceEntry }));
									setDisabledIds(cartSelectors.selectIds(store.getState()) as string[]);
								}}>
								{!isDisabled
									? translations[Languages.ru].general.order
									: translations[Languages.ru].general.ordered}
							</Button>
							{isDisabled && (
								<Button
									className='m-1 btn btn-dark'
									onClick={() => {
										store.dispatch(cartSlice.actions.removeItem({ id: serviceEntry.id }));
										setDisabledIds(cartSelectors.selectIds(store.getState()) as string[]);
									}}>
									{translations[Languages.ru].general.cancel}
								</Button>
							)}
						</div>
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
