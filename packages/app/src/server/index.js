import express from 'express';
import React from 'react';

import renderDocument from './utils/renderDocument';

import App from '../app/components/App';

const app = express();

app.get('/', (req, res) => {
	const markup = renderDocument(<App />);
	res.send(markup);
});

const port = 9152;
app.listen(port, () => {
	console.info(`App listening on :${port}`);
});
