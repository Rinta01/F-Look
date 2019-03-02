import React from 'react';
import './SubmitButton.scss';

const SubmitButton = ({ isSubmitting }) => {
	return (
		<button type='submit' disabled={isSubmitting}>
			Submit
		</button>
	);
};

export default SubmitButton;
