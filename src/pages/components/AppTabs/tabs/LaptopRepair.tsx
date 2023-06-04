import {
	ICurrencyTranslations,
	ITabTranslation,
	ITranslationEntry,
} from 'p@/common-types/common-types';
import React, { FunctionComponent } from 'react';

function LaptopRepair(props: {
	tabTranslate: ITabTranslation;
	generalTranslate: ITranslationEntry;
	currencyTranslate: ICurrencyTranslations;
}) {
	return <div>LaptopRepairContent</div>;
}

export default LaptopRepair as FunctionComponent;
