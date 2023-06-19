import {
	ICurrencyTranslations,
	IError,
	IField,
	IFlyer,
	ITabTranslation,
	ITranslationEntry,
	ITranslations,
} from 'p@/common-types/common-types';
import Flyer from 'pages/elements/flyer/Flyer';
import Grid from 'pages/elements/grid/Grid';
import Loading from 'pages/elements/loading/Loading';
import { getFlyers } from 'pages/store/effects';
import { selectFlyers } from 'pages/store/selectors';
import store from 'pages/store/store';
import { FunctionComponent, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { HttpClient } from 'HttpClient';
import ErrorToast from 'pages/elements/errorToast/ErrorToast';
import { flyerSlice } from 'pages/store/reducers';
import './AdminPanel.scss';

function AdminPanel(props: { translations: ITranslations; pathKey: string }) {
	const httpClient = new HttpClient();
	const [formStateTitle, setFormStateTitle] = useState<IField<string>>({
		value: '',
		valid: undefined,
	});
	const [formStateText, setFormStateText] = useState<Partial<IField<string>>>({
		value: '',
		valid: undefined,
	});
	const [formStateImage, setFormStateImage] = useState<Partial<IField<File>>>({
		value: undefined,
	});
	const [error, setError] = useState<string | undefined>(undefined);
	const [renderedFlyers, setRenderedFlyers] = useState<JSX.Element[]>([]);
	const flyers = useSelector(selectFlyers);
	function renderFlyers() {
		let flyersJSX: JSX.Element[] = [];
		flyers.forEach((flyer: IFlyer, index: number) => {
			flyersJSX.push(
				<div className={index % 2 == 0 ? 'flyer-container-right' : 'flyer-container-left'}>
					<button
						className='btn form-close'
						onClick={() => {
							httpClient.deleteFlyer(flyer.id, navigator.language).then(
								(flyers: IFlyer[]) => {
									store.dispatch(flyerSlice.actions.getFlyersSuccess({ flyers }));
									onCancel();
								},
								(Error: IError) => {
									setError(props.translations.errors[Error.error]);
								}
							);
						}}>
						<i className='bi bi-x-lg'></i>
					</button>
					<Flyer
						title={flyer.title}
						contentImage={
							<img
								src={`/images/${flyer.id}.png`}
								alt={flyer.href}></img>
						}
						contentText={flyer.text}
					/>
				</div>
			);
		});
		setRenderedFlyers([...flyersJSX]);
	}
	useEffect(() => {
		store.dispatch(getFlyers({ language: navigator.language }));
	}, []);
	useEffect(() => {
		renderFlyers();
	}, [flyers]);
	function checkRequiredFields(): boolean {
		let check = true;
		if (formStateTitle.value.length === 0) {
			setFormStateTitle({
				value: '',
				valid: false,
				message: props.translations.addFlyerForm.required,
				finalCheck: true,
			});
			check = false;
		}
		return check;
	}
	function onCancel() {
		setError(undefined);
	}
	function onSubmit(): void {
		setError(undefined);
		let emptyCheck = checkRequiredFields();

		if (emptyCheck && formStateTitle.valid) {
			const addFlyer = httpClient.addFlyer(
				'ru-RU',
				formStateTitle.value,
				formStateText.value || '',
				formStateImage.value
			);
			addFlyer.then(
				(flyers: IFlyer[]) => {
					store.dispatch(flyerSlice.actions.getFlyersSuccess({ flyers }));
					onCancel();
				},
				(Error: IError) => {
					console.log('error', Error);
					setError(props.translations.errors[Error.error]);
				}
			);
		}
	}
	return (
		<div>
			<Form
				className='user-select-none mb-5'
				id='novalidate-form'
				noValidate
				encType='multipart/form-data'>
				<Form.Label>
					<h3>{props.translations.addFlyerForm.addFlyer}</h3>
				</Form.Label>
				{error && (
					<ErrorToast
						message={error}
						className='mb-2'
					/>
				)}
				<Form.Group className='mb-2'>
					<Form.Label>{props.translations.addFlyerForm.title}</Form.Label>
					<Form.Control
						form='novalidate-form'
						type='text'
						isValid={formStateTitle.valid}
						isInvalid={formStateTitle.valid !== undefined && !formStateTitle.valid}
						onChange={(e) => {
							setFormStateTitle({
								...formStateTitle,
								valid: e.target.value.length > 0,
								value: e.target.value,
								finalCheck: false,
							});
						}}
					/>
					{formStateTitle.finalCheck && !formStateTitle.valid && (
						<span className='text-danger'>
							{formStateTitle.message} <br />
						</span>
					)}
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Label>{props.translations.addFlyerForm.text}</Form.Label>
					<Form.Control
						type='text'
						form='novalidate-form'
						onChange={(e) => {
							setFormStateText({
								...formStateText,
								value: e.target.value,
								finalCheck: false,
							});
						}}
					/>
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Label>{props.translations.addFlyerForm.image}</Form.Label>
					<Form.Control
						type='file'
						form='novalidate-form'
						id='file'
						name='file'
						onChange={(e) => {
							setFormStateImage({
								value: (e.target as HTMLInputElement).files![0],
								finalCheck: false,
							});
						}}
					/>
				</Form.Group>
				<div className='form-button-container'>
					<Button
						variant='dark'
						type='button'
						onClick={() => {
							onSubmit();
						}}>
						{props.translations.addFlyerForm.submit}
					</Button>
				</div>
			</Form>
			{props.translations ? (
				<Grid>{renderedFlyers}</Grid>
			) : (
				<Row>
					<Col>
						<Loading />
					</Col>
				</Row>
			)}
		</div>
	);
}

export default AdminPanel as FunctionComponent;
