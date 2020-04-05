import React from 'react';

import BrandedLayout from '../BrandedLayout';

export default function Login() {
	return (
		<BrandedLayout>
			<h1>Welcome</h1>
			<p>Please login below to do all the things.</p>
			<a href="/auth/google">Log in with Google</a>
		</BrandedLayout>
	);
}
