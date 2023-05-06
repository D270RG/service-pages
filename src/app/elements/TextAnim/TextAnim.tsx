import React from 'react';
import localFont from 'next/font/local';
import './TextAnim.scss';
import { Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
const animFont = localFont({ src: './SkylineBeach.ttf' });

function TextAnim(props: { text: string }) {
	return (
		<Container className='text-container'>
			<div className='svg-container'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					version='1.1'
					className='svg'>
					<g>
						<circle
							cy='150'
							cx='150'
							r='150'
							stroke='black'
							stroke-width='2'
							fill='none'
						/>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='100'
							height='100'
							x='33.333%'
							y='33.333%'
							fill='currentColor'
							viewBox='0 0 16 16'>
							<path d='M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z' />
						</svg>
					</g>
					<g className='quarter1'>
						<circle
							cy='42'
							cx='42'
							r='40'
							stroke='black'
							stroke-width='2'
							fill='white'
						/>
					</g>
					<g className='quarter1 reverse'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='84'
							height='84'
							fill='currentColor'
							className='inside-icon'
							viewBox='0 0 16 16'>
							<path d='M0 .995.995 0l3.064 2.19a.995.995 0 0 1 .417.809v.07c0 .264.105.517.291.704l5.677 5.676.909-.303a.995.995 0 0 1 1.018.24l3.338 3.339a.995.995 0 0 1 0 1.406L14.13 15.71a.995.995 0 0 1-1.406 0l-3.337-3.34a.995.995 0 0 1-.24-1.018l.302-.909-5.676-5.677a.995.995 0 0 0-.704-.291H3a.995.995 0 0 1-.81-.417L0 .995Zm11.293 9.595a.497.497 0 1 0-.703.703l2.984 2.984a.497.497 0 0 0 .703-.703l-2.984-2.984Z' />
						</svg>
					</g>

					<g className='quarter2'>
						<circle
							cy='42'
							cx='42'
							r='40'
							stroke='black'
							stroke-width='2'
							fill='white'
						/>
					</g>
					<g className='quarter2 reverse'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='84'
							height='84'
							fill='currentColor'
							className='inside-icon'
							viewBox='0 0 16 16'>
							<path d='m10.213 1.471.691-1.26c.046-.083.03-.147-.048-.192-.085-.038-.15-.019-.195.058l-.7 1.27A4.832 4.832 0 0 0 8.005.941c-.688 0-1.34.135-1.956.404l-.7-1.27C5.303 0 5.239-.018 5.154.02c-.078.046-.094.11-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.697 3.697 0 0 0 3.5 5.02h9c0-.75-.208-1.44-.623-2.072a4.266 4.266 0 0 0-1.664-1.476ZM6.22 3.303a.367.367 0 0 1-.267.11.35.35 0 0 1-.263-.11.366.366 0 0 1-.107-.264.37.37 0 0 1 .107-.265.351.351 0 0 1 .263-.11c.103 0 .193.037.267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264Zm4.101 0a.351.351 0 0 1-.262.11.366.366 0 0 1-.268-.11.358.358 0 0 1-.112-.264c0-.103.037-.191.112-.265a.367.367 0 0 1 .268-.11c.104 0 .19.037.262.11a.367.367 0 0 1 .107.265c0 .102-.035.19-.107.264ZM3.5 11.77c0 .294.104.544.311.75.208.204.46.307.76.307h.758l.01 2.182c0 .276.097.51.292.703a.961.961 0 0 0 .7.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182c0 .276.097.51.292.703a.972.972 0 0 0 .71.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76c.291 0 .54-.103.749-.308.207-.205.311-.455.311-.75V5.365h-9v6.404Zm10.495-6.587a.983.983 0 0 0-.702.278.91.91 0 0 0-.293.685v4.063c0 .271.098.501.293.69a.97.97 0 0 0 .702.284c.28 0 .517-.095.712-.284a.924.924 0 0 0 .293-.69V6.146a.91.91 0 0 0-.293-.685.995.995 0 0 0-.712-.278Zm-12.702.283a.985.985 0 0 1 .712-.283c.273 0 .507.094.702.283a.913.913 0 0 1 .293.68v4.063a.932.932 0 0 1-.288.69.97.97 0 0 1-.707.284.986.986 0 0 1-.712-.284.924.924 0 0 1-.293-.69V6.146c0-.264.098-.491.293-.68Z' />
						</svg>
					</g>

					<g className='quarter3'>
						<circle
							cy='42'
							cx='42'
							r='40'
							stroke='black'
							stroke-width='2'
							fill='white'
						/>
					</g>
					<g className='quarter3 reverse'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='84'
							height='84'
							fill='currentColor'
							className='inside-icon'
							viewBox='0 0 16 16'>
							<path d='M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z' />
						</svg>
					</g>

					<g className='quarter4'>
						<circle
							cy='42'
							cx='42'
							r='40'
							stroke='black'
							stroke-width='2'
							fill='white'
						/>
					</g>
					<g className='quarter4 reverse'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='84'
							height='84'
							fill='currentColor'
							className='inside-icon'
							viewBox='0 0 16 16'>
							<g className='apple-icon'>
								<path d='M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z' />
							</g>
						</svg>
					</g>
				</svg>
			</div>
			<div className={animFont.className + ' text'}>
				<div className='background-container'></div>
				{props.text}
			</div>
		</Container>
	);
}

export default TextAnim;
