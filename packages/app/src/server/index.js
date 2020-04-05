import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

import api from './utils/api';
import renderDocument from './utils/renderDocument';

import App from '../app/components/App';

const redirectUrl = encodeURIComponent(`${process.env.APP_URL}/auth/google/callback`);

const app = express();
app.disable('x-powered-by');

app.use('/assets', express.static(`${__dirname}/assets`));

app.get('/auth/google', (req, res) => {
	api(`/auth/google/url?redirectUrl=${redirectUrl}`).subscribe(
		({ response }) => {
			res.redirect(302, response.url);
		},
		({ response }) => {
			console.error(response);
			res.send('Failed to get google auth url');
		},
	);
});

app.get('/auth/google/callback', (req, res) => {
	const { code, error } = req.query;
	if (error || !code) {
		res.send('Failed to authorize using google');
		return;
	}

	api(`/auth/google/token?code=${code}&redirectUrl=${redirectUrl}`).subscribe(
		({ response }) => {
			console.log('GOT TOKEN', response);
			res.end();
		},
		({ response }) => {
			console.error(response);
			res.send(response.error);
		},
	);
});

app.get('*', (req, res) => {
	const context = {};
	const markup = renderDocument(
		<StaticRouter context={context} location={req.url}>
			<App />
		</StaticRouter>,
	);
	res.send(markup);
});

const port = 9152;
app.listen(port, () => {
	console.info(`App listening on :${port}`);
});
