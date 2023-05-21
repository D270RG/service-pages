'use client';
import './_app.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AppWithStore from './store/AppWithStore';

export default function Main() {
	return (
		<Provider store={store}>
			<AppWithStore></AppWithStore>
		</Provider>
	);
}
