import express from 'express';

import renderDocument from './utils/renderDocument';

const app = express();

app.get('/', (req, res) => {
	const markup = renderDocument('<div>Hello world!</div>');
	res.send(markup);
});

const port = 9152;
app.listen(port, () => {
	console.info(`App listening on :${port}`);
});
