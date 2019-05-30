import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icon.scss';
import t from 'prop-types';

const Icon = props => {
	return <FontAwesomeIcon {...props} className={`social-icon ${props.favored}`} />;
};

Icon.propTypes = {
	favored: t.string,
};

export default Icon;
