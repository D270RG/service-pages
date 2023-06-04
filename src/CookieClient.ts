export class CookieClient {
	public readCookies(cookieString: string) {
		var list = {} as any,
			rc = cookieString;

		rc &&
			rc.split(';').forEach(function (cookie) {
				var parts = cookie.split('=');
				list[parts.shift()!.trim()] = decodeURI(parts.join('='));
			});
		console.log('cookie', list);
		return list;
	}
	public writeCookie(key: string, value: string) {
		document.cookie = `${document.cookie}; ${key}=${value}`;
	}
	public clearCookie() {
		document.cookie = '';
	}
}
