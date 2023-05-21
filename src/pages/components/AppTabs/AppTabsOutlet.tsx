import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router';
import './AppTabs.scss';
import AppTabsContent from './AppTabsContent';
import { ITranslations } from 'p@/common-types/common-types';

function AppTabsOutlet(props: { translations: ITranslations }) {
	return (
		<Row>
			<Col>
				<Routes>
					<Route
						index
						element={<Navigate to='/home' />}
					/>
					<Route
						path='/*'
						element={<AppTabsContent translations={props.translations} />}></Route>
				</Routes>
			</Col>
		</Row>
	);
}

export default AppTabsOutlet;
