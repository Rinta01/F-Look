import React from 'react';
import './ErrorContainer.scss';

const ErrorContainer = ({ error }) => {
	if (error) {
		console.log(error.graphQLErrors, error.networkError, error.message)
		return (
			<p className='input-feedback'>
				{error.message.includes('duplicate')
					? 'This phone number is already registered!'
					: `${error.message.split(': ')[1]}`}
			</p>
		);
	} else return null;
};

export default ErrorContainer;
