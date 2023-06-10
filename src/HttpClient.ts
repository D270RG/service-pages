import { IError, IFlyer, IPriceList, ITabList } from 'p@/common-types/common-types';
import { loggedInSlice } from 'pages/store/reducers';
import store from 'pages/store/store';

function checkLoggedState(response: Response): void {
	console.log('check logged headers');
	console.log(response.headers.get('Loggedin'));
	if (response.headers.get('Loggedin') === 'true') {
		store.dispatch(
			loggedInSlice.actions.setLoggedState({ login: response.headers.get('Login') || undefined })
		);
	} else {
		store.dispatch(loggedInSlice.actions.setLoggedState({ login: undefined }));
	}
}
const serverAddress = '127.0.0.1:4000';
//TODO: add common HttpService
export class AuthHttpClient {
	public login(login: string, password: string) {
		let p = new Promise<void | IError>((resolve, reject) => {
			fetch(`http://${serverAddress}/login`, {
				method: 'POST',
				body: JSON.stringify({ login, password }),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
				.then((response: Response) => {
					checkLoggedState(response);
					if (response.ok) {
						resolve();
					} else {
						return response.json();
					}
				})
				.then((jsonData: IError) => reject(jsonData))
				.catch((err: Error) => {
					reject(err);
				});
		});
		return p;
	}
	public unlogin() {
		let p = new Promise<void | IError>((resolve, reject) => {
			fetch(`http://${serverAddress}/unlogin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
				.then((response: Response) => {
					checkLoggedState(response);
					if (response.ok) {
						resolve();
					} else {
						return response.json();
					}
				})
				.then((jsonData: IError) => reject(jsonData))
				.catch((err: Error) => {
					reject(err);
				});
		});
		return p;
	}
	public register(login: string, password: string) {
		let p = new Promise<void | IError>((resolve, reject) => {
			fetch(`http://${serverAddress}/addUser`, {
				method: 'POST',
				body: JSON.stringify({ login, password }),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
				.then((response: Response) => {
					checkLoggedState(response);
					if (response.ok) {
						resolve();
					} else {
						return response.json();
					}
				})
				.then((jsonData: IError) => reject(jsonData))
				.catch((err: Error) => {
					reject(err);
				});
		});
		return p;
	}
}
export class HttpClient {
	public getPaths(login: string | undefined): Promise<ITabList> {
		console.log('get paths by login', login);
		let p = new Promise<ITabList>((resolve, reject) => {
			fetch(`http://${serverAddress}/paths`, {
				method: 'POST',
				body: JSON.stringify({ login }),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
				.then((response: Response) => {
					checkLoggedState(response);
					console.log('paths response', response);
					return response.json();
				})
				.then((jsonData: string) => JSON.parse(jsonData))
				.then((data: ITabList) => {
					console.log('tabs', data);
					return resolve(data);
				})
				.catch((err: Error) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
	public getPrices(filteredTabMapKeys: string[], language: string): Promise<IPriceList> {
		let p = new Promise<IPriceList>((resolve, reject) => {
			fetch(`http://${serverAddress}/prices`, {
				method: 'POST',
				body: JSON.stringify({ paths: filteredTabMapKeys, language }),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
				.then((response: Response) => {
					checkLoggedState(response);
					return response.json();
				})
				.then((jsonData: string) => JSON.parse(jsonData))
				.then((data: IPriceList) => resolve(data))
				.catch((err: Error) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
	public getFlyers(language: string): Promise<IFlyer[]> {
		let p = new Promise<IFlyer[]>((resolve, reject) => {
			fetch(`http://${serverAddress}/flyers`, {
				method: 'POST',
				body: JSON.stringify({ language }),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})
				.then((response: Response) => {
					checkLoggedState(response);
					return response.json();
				})
				.then((jsonData: string) => {
					return JSON.parse(jsonData);
				})
				.then((data: IFlyer[]) => {
					resolve(data);
				})
				.catch((err: Error) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
}
