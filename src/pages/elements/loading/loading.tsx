import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.scss';

function Loading(props: { pageSuspense?: boolean }) {
	return (
		<div className={`spinner-cont ${props.pageSuspense ? 'pageSuspense' : ''}`}>
			<Spinner animation='border' />
		</div>
	);
}

export default Loading;
