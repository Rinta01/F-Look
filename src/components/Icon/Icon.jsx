import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icon.scss';

const Icon = props => {
	return <FontAwesomeIcon {...props} className='social-icon' />;
};

export default Icon;
