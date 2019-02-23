import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StatusContainer.scss';

const StatusContainer = ({ error = null, success = null }) => {
	const [renderChild, setState] = useState(1);
	let interval = null;

	useEffect(() => {
		interval = setTimeout(() => setState(!renderChild), 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	if (error && renderChild) {
		console.log(error.graphQLErrors, error.networkError, error.message);
		return (
			<p className='input-feedback'>
				{error.message.includes('duplicate')
					? 'This phone number is already registered!'
					: `${error.message.split(': ')[1]}`}
			</p>
		);
	} else if (success && renderChild) {
		return (
			<p className='input-feedback success'>
				<FontAwesomeIcon icon='check' />
			</p>
		);
	} else return null;
};

export default StatusContainer;
