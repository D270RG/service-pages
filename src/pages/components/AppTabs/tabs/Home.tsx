import Flyer from 'pages/elements/flyer/Flyer';
import Grid from 'pages/elements/grid/Grid';
import Loading from 'pages/elements/loading/Loading';
import TextAnim from 'pages/elements/TextAnim/TextAnim';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IFlyer, ITranslations } from 'p@/common-types/common-types';
import store from 'pages/store/store';
import { getFlyers } from 'pages/store/effects';
import { useSelector } from 'react-redux';
import { selectFlyers } from 'pages/store/selectors';

function Home(props: { translations: ITranslations; pathKey: string }) {
	const [renderedFlyers, setRenderedFlyers] = useState<JSX.Element[]>([]);
	const flyers = useSelector(selectFlyers);
	useEffect(() => {
		store.dispatch(getFlyers({ language: navigator.language }));
	}, []);
	useEffect(() => {
		renderFlyers();
	}, [flyers]);
	function renderFlyers() {
		let flyersJSX: JSX.Element[] = [];
		flyers.forEach((flyer: IFlyer, index: number) => {
			flyersJSX.push(
				<div className={index % 2 == 0 ? 'flyer-container-right' : 'flyer-container-left'}>
					<Flyer
						title={flyer.title}
						contentImage={
							<img
								src={`/images/${flyer.id}.png`}
								alt={flyer.href}></img>
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

export default Home as FunctionComponent;
