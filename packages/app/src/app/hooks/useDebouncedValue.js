import { useEffect, useState } from 'react';

export default function useDebouncedValue(input, delay = 400) {
	const [value, setValue] = useState(input);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setValue(input);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [input]);

	return value;
}
