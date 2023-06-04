import {
	ICurrencyTranslations,
	ITabTranslation,
	ITranslationEntry,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function FirstHelp(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: ITranslationEntry;
	currencyTranslate: ICurrencyTranslations;
}) {
	return <div className='inlineText'>{props.tabTranslate.texts.test1}</div>;
}

export default FirstHelp as FunctionComponent;
