import React from 'react';
import localFont from 'next/font/local';
import './TextAnim.scss';
import { Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SvgAnim from '../svgAnim/SvgAnim';
const animFont = localFont({ src: './SkylineBeach.ttf' });

function TextAnim(props: { text: string }) {
	return (
		<Container className='text-container my-5'>
			<SvgAnim />
			<div className={animFont.className + ' text'}>
				<div className='background-container'></div>
				{props.text}
			</div>
		</Container>
	);
}

export default TextAnim;
