export default function renderDocument(markup) {
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>Food</title>
	</head>
	<body>
		<div id="app-root">${markup}</div>
	</body>
</html>`;
}
