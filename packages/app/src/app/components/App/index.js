import './base.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ComingSoon from '../ComingSoon';
import Login from '../Login';
import RecipeCreate from '../RecipeCreate';

export default function App() {
	return (
		<Switch>
			<Route path="/recipes/new">
				<RecipeCreate />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/">
				<ComingSoon />
			</Route>
		</Switch>
	);
}
