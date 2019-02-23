import React from 'react';
import sizeTable from '../../utils/constants/sizeTable';
import './SizeChoice.scss';

const SizeChoice = () => {
	const createTable = () => {
		let items = [];
		for (let key in sizeTable) {
			items.push(
				<li key={`${key}-size-key`}>
					<div>
						<span>{key.toUpperCase()}</span>
						<span>{sizeTable[key]}</span>
					</div>
					<input type='checkbox' name={key} />
				</li>
			);
		}
		return items;
	};

	return (
		<div className='size-table-wrapper'>
			<h3>I want to see these sizes:</h3>
			<ul className='size-table'>{createTable()}</ul>
		</div>
	);
};

export default SizeChoice;
