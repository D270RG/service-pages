import {
	ICurrencyTranslations,
	ITranslationEntry,
	ITabTranslation,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function PhoneRepair(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: ITranslationEntry;
	currencyTranslate: ICurrencyTranslations;
}) {
	return <div>PhoneRepairContent</div>;
}

export default PhoneRepair as FunctionComponent;
