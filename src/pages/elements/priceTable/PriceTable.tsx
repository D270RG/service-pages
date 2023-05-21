import { cartSlice } from 'pages/store/reducers';
import React, { useEffect, useState } from 'react';
import './PriceTable.scss';
import { Button } from 'react-bootstrap';
import store from 'pages/store/store';
import {
	ICurrencyTranslations,
	IGeneralTranslations,
	IPriceList,
	IServiceDescs,
	Languages,
} from 'p@/common-types/common-types';
import { cartSelectors } from 'pages/store/selectors';

function PriceTable(props: {
	serviceDescriptions: IServiceDescs;
	currencyTranslations: ICurrencyTranslations;
	generalTranslations: IGeneralTranslations;
	priceInfo: IPriceList;
	path: string;
}) {
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
					<td>
						<div className='d-flex flex-column'>
							<span>{props.serviceDescriptions[serviceEntry.descriptionId].description}</span>
							<span className='show-col mt-2'>
								{serviceEntry.price} {props.currencyTranslations[serviceEntry.currency]}
							</span>
						</div>
					</td>
					<td className='hide-col'>
						{serviceEntry.price} {props.currencyTranslations[serviceEntry.currency]}
					</td>
					<td>
						<div className='d-flex justify-content-center align-items-center flex-row flex-wrap'>
							<Button
								className='m-1 btn btn-dark text-break'
								disabled={isDisabled}
								onClick={() => {
									store.dispatch(cartSlice.actions.addItem({ cartItem: serviceEntry }));
									setDisabledIds(cartSelectors.selectIds(store.getState()) as string[]);
								}}>
								{!isDisabled ? props.generalTranslations.order : props.generalTranslations.ordered}
							</Button>
							{isDisabled && (
								<Button
									className='m-1 btn btn-dark text-break'
									onClick={() => {
										store.dispatch(cartSlice.actions.removeItem({ id: serviceEntry.id }));
										setDisabledIds(cartSelectors.selectIds(store.getState()) as string[]);
									}}>
									{props.generalTranslations.cancel}
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
		<table className='table my-4'>
			<thead>
				<tr>
					<th>Название</th>
					<th className='hide-col'>Цена</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{renderPrices()}</tbody>
		</table>
	);
}

export default PriceTable;
