import {
	ICurrencyTranslations,
	IGeneralTranslations,
	ITabTranslation,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function PhoneRepair(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: IGeneralTranslations;
	currencyTranslate: ICurrencyTranslations;
}) {
	return <div>PhoneRepairContent</div>;
}

export default PhoneRepair as FunctionComponent;
