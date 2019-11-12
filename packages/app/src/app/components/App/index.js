import './base.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ComingSoon from '../ComingSoon';

export default function App() {
	return (
		<Switch>
			<Route path="/">
				<ComingSoon />
			</Route>
		</Switch>
	);
}
