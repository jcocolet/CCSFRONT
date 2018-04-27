import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from "../utiles/constants";

@Injectable()
export class Api {

	url: string;

	constructor(public http: Http, private c: Constants) {
		this.url = c.URL;
	}

	get(endpoint: string, params?: any, options?: RequestOptions) {
		if (!options) {
			options = new RequestOptions();
		}

		if (params) {
			let p = new URLSearchParams();
			for (let k in params) {
				p.set(k, params[k]);
			}
			options.search = !options.search && p || options.search;
		}

		return this.http.get(this.url + '/' + endpoint, options);
	}

	post(endpoint: string, body: any, options?: RequestOptions) {
		return this.http.post(this.url + '/' + endpoint, body, options);
	}

	put(endpoint: string, body: any, options?: RequestOptions) {
		return this.http.put(this.url + '/' + endpoint, body, options);
	}

	delete(endpoint: string, options?: RequestOptions) {
		return this.http.delete(this.url + '/' + endpoint, options);
	}

	patch(endpoint: string, body: any, options?: RequestOptions) {
		return this.http.patch(this.url + '/' + endpoint, body, options);
	}
}