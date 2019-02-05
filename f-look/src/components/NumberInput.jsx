import React from 'react';

const NumberInput = ({ name, onChange, errors, touched }) => {
	return (
		<input
			type='text'
			pattern='\d*'
			maxLength='1'
			name={name}
			autoComplete='nope'
			onChange={onChange}
			className={errors[name] && touched[name] ? 'input-error' : ''}
		/>
	);
};

export default NumberInput;
