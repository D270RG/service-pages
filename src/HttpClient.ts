import { IFlyer, IPriceList, ITranslations } from 'p@/common-types/common-types';

//TODO: add common HttpService
export class HttpClient {
	public serverAddress = '127.0.0.1:4000';
	public getPrices(filteredTabMapKeys: string[], language: string) {
		let p = new Promise<IPriceList>((resolve, reject) => {
			fetch(`http://${this.serverAddress}/prices`, {
				method: 'POST',
				body: JSON.stringify({ paths: filteredTabMapKeys, language }),
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
				.then((data) => {
					console.log('data price', data);
					return data;
				})
				.then((data: IPriceList) => resolve(data))
				.catch((err) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
	public getFlyers(language: string) {
		let p = new Promise<IFlyer[]>((resolve, reject) => {
			fetch(`http://${this.serverAddress}/flyers`, {
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
