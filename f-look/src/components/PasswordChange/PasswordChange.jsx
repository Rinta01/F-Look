import React, { useState } from 'react';
import { TextInput } from '../InputTypes';
import { CollapseHeader } from '../CollapseHeader';
import './PasswordChange.scss';

const PasswordChange = props => {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<div className='pas-wrapper'>
			<CollapseHeader
				{...{ collapsed, setCollapsed, label: 'Change Password' }}
			/>
			<div className={`collapsible ${collapsed ? 'collapsed' : ''}`}>
				<TextInput name='password' {...props} />
				<TextInput name='confirm_password' {...props} />
			</div>
		</div>
	);
};

export default PasswordChange;
