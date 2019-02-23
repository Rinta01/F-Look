import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';

const NumberInput = ({ name, handleChange, errors, touched, values }) => {
	if (name === 'age') {
		return (
			<div className='styled-input'>
				<label htmlFor={`${name}-input`}>{name.toUpperCase()}</label>
				<input
					type='text'
					pattern='\d*'
					maxLength='3'
					id={`${name}-input`}
					name={name}
					value={values[name] ? values[name] : ''}
					placeholder={name}
					onChange={handleChange}
					className={`input-field ${errors[name] &&
						touched[name] &&
						'input-error'}`}
				/>
				{errors[name] && errors[name] !== 'required' && (
					<div className='input-feedback'>{errors[name]}</div>
				)}
			</div>
		);
	} else
		return (
			<input
				type='text'
				pattern='\d*'
				maxLength='1'
				name={name}
				autoComplete='nope'
				onChange={handleChange}
				className={`input-field ${errors[name] &&
					touched[name] &&
					'input-error'}`}
			/>
		);
};

NumberInput.propTypes = {
	name: PropTypes.string,
	handleChange: PropTypes.func,
	errors: PropTypes.object,
	touched: PropTypes.object,
};

export default NumberInput;
