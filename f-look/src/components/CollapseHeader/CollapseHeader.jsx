import React from 'react';
import { Icon } from '../Icon';
import './CollapseHeader.scss';

const CollapseHeader = ({ collapsed, setCollapsed, label }) => {
	return (
		<header
			className='collapse-label'
			onClick={() => {
				collapsed ? setCollapsed(false) : setCollapsed(true);
			}}>
			<span>{label}</span>
			<span>
				<Icon icon={collapsed ? 'plus' : 'minus'} />
			</span>
		</header>
	);
};

export default CollapseHeader;
