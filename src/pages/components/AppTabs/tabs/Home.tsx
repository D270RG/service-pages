import Flyer from 'pages/elements/flyer/Flyer';
import Grid from 'pages/elements/grid/Grid';
import Loading from 'pages/elements/loading/Loading';
import TextAnim from 'pages/elements/TextAnim/TextAnim';
import Image from 'next/image';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
	ICurrencyTranslations,
	IFlyer,
	IGeneralTranslations,
	ITabTranslation,
} from 'p@/common-types/common-types';
import { HttpClient } from 'HttpClient';

function Home(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: IGeneralTranslations;
	currencyTranslate: ICurrencyTranslations;
}) {
	const [flyers, setFlyers] = useState<IFlyer[]>([]);
	const [renderedFlyers, setRenderedFlyers] = useState<JSX.Element[]>([]);
	const httpClient = new HttpClient();
	useEffect(() => {
		httpClient.getFlyers(navigator.language).then((flyers: IFlyer[]) => {
			console.log('received flyers', flyers);
			setFlyers([...flyers]);
		});
	}, []);
	useEffect(() => {
		renderFlyers();
		console.log(props.tabTranslate);
	}, [flyers]);
	function renderFlyers() {
		let flyersJSX: JSX.Element[] = [];
		flyers.forEach((flyer: IFlyer, index: number) => {
			flyersJSX.push(
				<div className={index % 2 == 0 ? 'flyer-container-right' : 'flyer-container-left'}>
					<Flyer
						title={flyer.title}
						contentImage={
							<Image
								src={require(`p@/images/${flyer.id}.png`)}
								alt={flyer.href}></Image>
						}
						contentText={flyer.text}
						href={flyer.href}
					/>
				</div>
			);
		});
		setRenderedFlyers([...flyersJSX]);
	}
	return (
		<div className='mb-5'>
			<TextAnim text='ЯСВЕТЛЫЙ'></TextAnim>
			{props.tabTranslate ? (
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

export default Home as FunctionComponent;
