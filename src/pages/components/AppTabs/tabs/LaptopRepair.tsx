import {
	ICurrencyTranslations,
	IGeneralTranslations,
	ITabTranslation,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function LaptopRepair(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: IGeneralTranslations;
	currencyTranslate: ICurrencyTranslations;
}) {
	return <div>LaptopRepairContent</div>;
}

export default LaptopRepair as FunctionComponent;
