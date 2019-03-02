import React from 'react';
import sizeTable from '../../utils/constants/sizeTable';
import './SizeChoice.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SizeChoice = ({errors, name}) => {
	const createTable = () => {
		let items = [];
		for (let key in sizeTable) {
			items.push(
				<li key={`${key}-size-key`}>
					<div>
						<span>{key.toUpperCase()}</span>
						<span>{sizeTable[key]}</span>
					</div>
					<input type='radio' value={key} name='size'/>
				</li>
			);
		}
		return items;
	};

	return (
		<div className='size-table-wrapper'>
			<h3>My size is:</h3>
			<ul className='size-table'>{createTable()}</ul>
			<ErrorMessage {...{errors, name}}/>
			</div>
	);
};

export default SizeChoice;
