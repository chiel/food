import { renderToString } from 'react-dom/server';

export default function renderDocument(component) {
	const markup = renderToString(component);

	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>Food</title>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Shadows+Into+Light+Two&display=swap">
		<link rel="stylesheet" href="/assets/app.css">
	</head>
	<body>
		<div id="app-root">${markup}</div>
	</body>
</html>`;
}
