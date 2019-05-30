import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icon.scss';

const Icon = props => {
	console.log(props.favored);
	return <FontAwesomeIcon {...props} className={`social-icon ${props.favored ? 'favored' : ''}`} />;
};

export default Icon;
