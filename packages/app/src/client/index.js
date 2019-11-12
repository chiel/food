import React from 'react';
import { hydrate } from 'react-dom';

import App from '../app/components/App';

hydrate(
	<App />,
	document.getElementById('app-root'),
);
