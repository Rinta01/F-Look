import React from 'react';
import './StatusContainer.scss';

const StatusContainer = ({ error = null, success }) => {
	if (error) {
		console.log(error.graphQLErrors, error.networkError, error.message);
		return (
			<p className='input-feedback'>
				{error.message.includes('duplicate')
					? 'This phone number is already registered!'
					: `${error.message.split(': ')[1]}`}
			</p>
		);
	} else if (success) {
		return <p className='input-feedback success'>Success!</p>;
	}
	else return null;
};

export default StatusContainer;
