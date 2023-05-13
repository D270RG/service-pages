import React, { FunctionComponent } from 'react';

function FirstHelp(props: { translate: any }) {
	return <div>{props.translate.texts.test1}</div>;
}

export default FirstHelp as FunctionComponent;
