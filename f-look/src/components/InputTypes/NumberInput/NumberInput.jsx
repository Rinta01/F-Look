import React from 'react';
import '../TextInput/TextInput.scss';
import './NumberInput.scss';
import PropTypes from 'prop-types';

const NumberInput = ({ name, onChange, errors, touched }) => {
	return (
		<input
			type='text'
			pattern='\d*'
			maxLength='1'
			name={name}
			autoComplete='nope'
			onChange={onChange}
			className={`input-field ${errors[name] && touched[name] && 'input-error'}`}
		/>
	);
};

NumberInput.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	errors: PropTypes.object,
	touched: PropTypes.object,
};

export default NumberInput;
