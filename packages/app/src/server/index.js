import express from 'express';

const app = express();

app.get('/', (req, res) => {
	const markup = '<div>Hello world!</div>';
	res.send(markup);
});

const port = 9152;
app.listen(port, () => {
	console.info(`App listening on :${port}`);
});
