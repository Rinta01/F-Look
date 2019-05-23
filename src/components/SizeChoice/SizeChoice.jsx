import React, { useState } from 'react';
import sizeTable from '../../utils/constants/sizeTable';
import './SizeChoice.scss';
import { ErrorMessage } from '../ErrorMessage/';
import { CollapseHeader } from '../CollapseHeader/';

const SizeChoice = ({ values, errors, name, handleChange }) => {
	const [collapsed, setCollapsed] = useState(false);

	const createTable = () => {
		let items = [];
		for (let key in sizeTable) {
			items.push(
				<li key={`${key}-size-key`}>
					<div>
						<span>{key.toUpperCase()}</span>
						<span>{sizeTable[key]}</span>
					</div>
					<input
						type='radio'
						value={sizeTable[key]}
						name='size'
						onChange={handleChange}
						checked={values.size === sizeTable[key]}
					/>
				</li>
			);
		}
		return items;
	};

	return (
		<div className='size-table-wrapper'>
			<CollapseHeader
				{...{ collapsed, setCollapsed, label: 'Select size' }}
			/>
			<ul
				className={`size-table collapsible ${
					collapsed ? 'collapsed' : ''
				}`}>
				{createTable()}
			</ul>
			<ErrorMessage {...{ errors, name }} />
		</div>
	);
};

export default SizeChoice;
