import { useEffect, useState } from 'react';

export default function useAutocomplete(query) {
	const [state, setState] = useState({
		data: [],
		error: false,
		loading: false,
	});

	useEffect(() => {
		if (query.length < 3) return;

		console.log('query some stuff');
	}, [query]);

	return state;
}
