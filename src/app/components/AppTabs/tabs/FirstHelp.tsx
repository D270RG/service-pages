import React, { FunctionComponent } from 'react';

function FirstHelp(props: { translate: any }) {
	return <div>{props.translate.texts[1]}</div>;
}

export default FirstHelp as FunctionComponent;
