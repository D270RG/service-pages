import Flyer from '@/app/elements/flyer/Flyer';
import Grid from '@/app/elements/grid/Grid';
import Loading from '@/app/elements/loading/loading';
import TextAnim from '@/app/elements/TextAnim/TextAnim';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import r1 from 'p@/r1.png';
import r2 from 'p@/r2.png';
import './tabs.scss';

function TabHome(props: { translate: any }) {
	return (
		<div>
			<TextAnim text='ЯСВЕТЛЫЙ'></TextAnim>
			{props.translate ? (
				<Grid>
					<div className='flyer-container-right'>
						<Flyer
							title={props.translate.cardTexts.direction1.title}
							contentImage={
								<Image
									src={r1}
									alt={props.translate.cardTexts.direction1.title}></Image>
							}
							contentText={props.translate.cardTexts.direction1.text}
							href='/first-help'
						/>
					</div>
					<div className='flyer-container-left'>
						<Flyer
							title={props.translate.cardTexts.direction2.title}
							contentImage={
								<Image
									src={r2}
									alt={props.translate.cardTexts.direction2.title}></Image>
							}
							contentText={props.translate.cardTexts.direction2.text}
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

export default TabHome as FunctionComponent;
