import PT from 'prop-types';
import React from 'react';

import css from './styles.css';

export default function BrandedLayout({ children }) {
	return (
		<div className={css.outer}>
			<div className={css.brand} />
			<div className={css.inner}>
				<div className={css.content}>
					{children}
				</div>
			</div>
		</div>
	);
}

BrandedLayout.propTypes = {
	children: PT.node.isRequired,
};
