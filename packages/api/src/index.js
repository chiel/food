import express from 'express';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
	res.json({});
});

const port = 9153;
app.listen(port, () => {
	console.info(`Api listening on :${port}`);
});
