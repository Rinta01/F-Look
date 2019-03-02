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
				{/* feature not implemented on backend */}
				<TextInput name='password' {...props} disabled/>
				<TextInput name='confirm_password' {...props} disabled/>
			</div>
		</div>
	);
};

export default PasswordChange;
