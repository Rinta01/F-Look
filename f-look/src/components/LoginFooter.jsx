import React from 'react';
import '../css/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginFooter = ({ signup }) => {
	return (
		<footer>
			<span>Sign {signup ? 'Up' : 'In'} Via:</span>
			<div>
				<FontAwesomeIcon
					className='social-icon'
					icon={['fab', 'facebook-square']}
				/>
				<FontAwesomeIcon
					className='social-icon'
					icon={['fab', 'google-plus-square']}
				/>
				<FontAwesomeIcon className='social-icon' icon={['fab', 'vk']} />
			</div>
		</footer>
	);
};

export default LoginFooter;
