import express from 'express';
import { map, switchMap } from 'rxjs/operators';

import request from './utils/request';

const app = express();
app.disable('x-powered-by');

function getGoogleAccessToken(code, redirectUrl) {
	return request({
		url: 'https://oauth2.googleapis.com/token',
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: [
			`code=${code}`,
			`client_id=${process.env.AUTH_GOOGLE_CLIENT_ID}`,
			`client_secret=${process.env.AUTH_GOOGLE_CLIENT_SECRET}`,
			`redirect_uri=${redirectUrl}`,
			'grant_type=authorization_code',
		].join('&'),
	}).pipe(
		map(({ response }) => response.access_token),
	);
}

function getGoogleUser(token) {
	const fields = 'names,photos,emailAddresses';

	return request({
		url: `https://people.googleapis.com/v1/people/me?personFields=${fields}`,
		method: 'get',
		headers: {
			authorization: `Bearer ${token}`,
		},
	}).pipe(
		map(({ response }) => {
			const name = response.names.find(({ metadata }) => !!metadata.primary);
			const photo = response.photos.find(({ metadata }) => !!metadata.primary);
			const email = response.emailAddresses.find(({ metadata }) => !!metadata.primary);

			return {
				id: name.metadata.source.id,
				givenName: name.givenName,
				familyName: name.familyName,
				email: email.value,
				image: photo.url.replace(/s\d+$/, 's360'),
			};
		}),
	);
}

app.get('/auth/google/url', (req, res) => {
	const { redirectUrl } = req.query;
	if (!redirectUrl) {
		return res.status(400).json({
			error: {
				message: 'No `redirectUrl` provided',
			},
		});
	}

	const url = [
		'https://accounts.google.com/o/oauth2/v2/auth',
		`?scope=${encodeURIComponent('email profile')}`,
		'&response_type=code',
		'&access_type=online',
		`&client_id=${process.env.AUTH_GOOGLE_CLIENT_ID}`,
		`&redirect_uri=${encodeURIComponent(redirectUrl)}`,
	].join('');

	res.json({ url });
});

app.get('/auth/google/token', (req, res) => {
	const { code, redirectUrl } = req.query;
	if (!redirectUrl) {
		return res.status(400).json({
			error: {
				message: 'No `redirectUrl` provided',
			},
		});
	}

	getGoogleAccessToken(code, redirectUrl).pipe(
		switchMap(getGoogleUser),
	).subscribe(
		profile => {
			console.log('NEXT', profile);
			res.json({});
		},
		({ response }) => {
			console.error(response);
			res.status(400).json({
				error: {
					message: 'Failed to exchange code for an access token',
				},
			});
		},
	);
});

const port = 9153;
app.listen(port, () => {
	console.info(`Api listening on :${port}`);
});
