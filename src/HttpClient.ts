import { IFlyer, IPriceList, IServiceDescs, ITranslations } from 'p@/common-types/common-types';

//TODO: add common HttpService
export class HttpClient {
	public serverAddress = '127.0.0.1:4000';
	public getPrices(filteredTabMapKeys: string[]) {
		let p = new Promise<IPriceList>((resolve, reject) => {
			fetch(`http://${this.serverAddress}/prices`, {
				method: 'POST',
				body: JSON.stringify(filteredTabMapKeys),
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
				.then((data: IPriceList) => resolve(data))
				.catch((err) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
	public getServiceDescriptions() {
		let p = new Promise<IServiceDescs>((resolve, reject) => {
			fetch(`http://${this.serverAddress}/serviceDescriptions`, {
				method: 'GET',
			})
				.then((response: Response) => {
					return response.json();
				})
				.then((jsonData: string) => {
					return JSON.parse(jsonData);
				})
				.then((data: IServiceDescs) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
	public getTranslations(locale: string) {
		console.log('get translations', locale);
		let p = new Promise<ITranslations>((resolve, reject) => {
			fetch(`http://${this.serverAddress}/translations`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ locale: locale }),
			})
				.then((response: Response) => {
					return response.json();
				})
				.then((jsonData: string) => {
					return JSON.parse(jsonData);
				})
				.then((data: ITranslations) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
					console.log(err.message);
				});
		});
		return p;
	}
	public getFlyers() {
		let p = new Promise<IFlyer[]>((resolve, reject) => {
			fetch(`http://${this.serverAddress}/flyers`, {
				method: 'GET',
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
