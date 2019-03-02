import React from 'react';
import { Icon } from '../Icon';

const BrandSearch = props => {
	return (
		<div>
			<input type='text' placeholder='Enter a brand' />
			<div className="brands-show"></div>
		</div>
	);
};

export default BrandSearch;
