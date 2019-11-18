import express from 'express';

const app = express();
app.disable('x-powered-by');

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

const port = 9153;
app.listen(port, () => {
	console.info(`Api listening on :${port}`);
});
