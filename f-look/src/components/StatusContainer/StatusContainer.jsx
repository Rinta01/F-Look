import React, { useState, useEffect } from 'react';
import Icon from '../Icon/Icon';
import './StatusContainer.scss';

const StatusContainer = ({ error, success, handleUnmount }) => {
	const [renderChild, setState] = useState(1);
	console.log(error, success, handleUnmount);

	useEffect(() => {
		let interval = setTimeout(() => setState(!renderChild), 2000);
		return () => {
			clearInterval(interval);
			// if (handleUnmount !== undefined) {
			// 	console.log('eee');
			// 	handleUnmount();
			// }
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
				<Icon icon='check' />
			</p>
		);
	} else return null;
};

export default StatusContainer;
