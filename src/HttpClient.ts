import { IFlyer, IPriceList, ITabList, ITranslations } from 'p@/common-types/common-types';

const serverAddress = '127.0.0.1:4000';
//TODO: add common HttpService
export class AuthHttpClient {
	public login(login: string, password: string) {}
	public register() {}
}
export class HttpClient {
	public getPaths(login: string | undefined): Promise<ITabList> {
		let p = new Promise<ITabList>((resolve, reject) => {
			fetch(`http://${serverAddress}/paths`, {
				method: 'POST',
				body: JSON.stringify({ login }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response: Response) => response.json())
				.then((jsonData: string) => JSON.parse(jsonData))
				.then((data: ITabList) => resolve(data))
				.catch((err) => {
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
			})
				.then((response: Response) => response.json())
				.then((jsonData: string) => JSON.parse(jsonData))
				.then((data: IPriceList) => resolve(data))
				.catch((err) => {
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
			})
				.then((response: Response) => {
					return response.json();
				})
				.then((jsonData: string) => {
					return JSON.parse(jsonData);
				})
				.then((data: IFlyer[]) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
}
