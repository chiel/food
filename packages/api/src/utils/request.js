import { ajax } from 'rxjs/ajax';
import XHR2 from 'xhr2';

export default function request(options) {
	return ajax({
		createXHR: () => new XHR2(),
		...options,
	});
}
