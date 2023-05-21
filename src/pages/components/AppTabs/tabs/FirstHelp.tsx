import {
	ICurrencyTranslations,
	IGeneralTranslations,
	ITabTranslation,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function FirstHelp(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: IGeneralTranslations;
	currencyTranslate: ICurrencyTranslations;
}) {
	return <div>{props.tabTranslate.texts.test1}</div>;
}

export default FirstHelp as FunctionComponent;
