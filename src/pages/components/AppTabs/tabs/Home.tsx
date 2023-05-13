import Flyer from 'pages/elements/flyer/Flyer';
import Grid from 'pages/elements/grid/Grid';
import Loading from 'pages/elements/loading/loading';
import TextAnim from 'pages/elements/TextAnim/TextAnim';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import r1 from 'p@/images/r1.png';
import r2 from 'p@/images/r2.png';
import './tabs.scss';

function Home(props: { translate: any }) {
	return (
		<div className='mb-5'>
			<TextAnim text='ЯСВЕТЛЫЙ'></TextAnim>
			{props.translate ? (
				<Grid>
					<div className='flyer-container-right'>
						<Flyer
							title={props.translate.titles.cardTitle1}
							contentImage={
								<Image
									src={r1}
									alt={props.translate.titles.cardTitle1}></Image>
							}
							contentText={props.translate.texts.card1}
							href='/first-help'
						/>
					</div>
					<div className='flyer-container-left'>
						<Flyer
							title={props.translate.titles.cardTitle2}
							contentImage={
								<Image
									src={r2}
									alt={props.translate.titles.cardTitle2}></Image>
							}
							contentText={props.translate.texts.card2}
							href='/first-help'
						/>
					</div>
				</Grid>
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
