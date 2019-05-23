import React from 'react';
import './LoginFooter.scss';
import Icon from '../Icon/Icon';

const LoginFooter = ({ signup }) => {
	return (
		<footer>
			<span>Sign {signup ? 'Up' : 'In'} Via:</span>
			<div>
				<Icon
					className='social-icon'
					icon={['fab', 'facebook-square']}
				/>
				<Icon
					className='social-icon'
					icon={['fab', 'google-plus-square']}
				/>
				<Icon className='social-icon' icon={['fab', 'vk']} />
			</div>
		</footer>
	);
};

export default LoginFooter;
