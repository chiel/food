import { ajax } from 'rxjs/ajax';
import XHR2 from 'xhr2';

export default function api(endpoint, options) {
	const apiUrl = process.env.API_URL;

	return ajax({
		createXHR: () => new XHR2(),
		url: `${apiUrl}${endpoint}`,
		...options,
	});
}
