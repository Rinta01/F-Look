import React from 'react';
import './SubmitButton.scss';

const SubmitButton = (props) => {
	return (
		<button type='submit' {...props}>
			Submit
		</button>
	);
};

export default SubmitButton;
