import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

import renderDocument from './utils/renderDocument';

import App from '../app/components/App';

const app = express();

app.use('/assets', express.static(`${__dirname}/assets`));

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
