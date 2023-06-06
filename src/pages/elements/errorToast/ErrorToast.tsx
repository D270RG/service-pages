import React from 'react';
import './ErrorToast.scss';

function ErrorToast(props: { message: string; className: string }) {
	return <div className={`${props.className} error-toast`}>{props.message}</div>;
}

export default ErrorToast;
