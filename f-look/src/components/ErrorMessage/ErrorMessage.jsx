import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ errors, name }) => {
	return (
		<>
			{errors[name] && errors[name] !== 'required' && (
				<div className='input-feedback'>{errors[name]}</div>
			)}
		</>
	);
};

export default ErrorMessage;
