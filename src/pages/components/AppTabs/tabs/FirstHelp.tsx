import {
	ICurrencyTranslations,
	ITabTranslation,
	ITranslationEntry,
	ITranslations,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function FirstHelp(props: { translations: ITranslations; pathKey: string }) {
	return <div className='inlineText'>{props.translations.tabs[props.pathKey].texts.test1}</div>;
}

export default FirstHelp as FunctionComponent;
