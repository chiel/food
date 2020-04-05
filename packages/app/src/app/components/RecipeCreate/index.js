import React, { useState } from 'react';

import useAutocomplete from '../../hooks/useAutocomplete';
import useDebouncedValue from '../../hooks/useDebouncedValue';

export default function RecipeCreate() {
	const [ingredients, setIngredients] = useState([]);
	const [input, setInput] = useState('');
	const value = useDebouncedValue(input);
	const state = useAutocomplete(value);

	console.log('STATE', state);

	function handleChange(ev) {
		setInput(ev.target.value);
	}

	function handleKeyDown(ev) {
		if (ev.keyCode === 13) {
			ev.preventDefault();
			setIngredients([...ingredients, { name: input }]);
			setInput('');
		}
	}

	return (
		<>
			<h1>Create a new recipe</h1>
			<p>Here, you can add a new recipe</p>
			<ul>
				{ingredients.map((ingredient, i) => (
					// eslint-disable-next-line react/no-array-index-key
					<li key={i}>{ingredient.name}</li>
				))}
			</ul>
			<input
				type="text"
				value={input}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
		</>
	);
}
