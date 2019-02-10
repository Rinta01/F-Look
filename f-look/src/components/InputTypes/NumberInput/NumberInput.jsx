import React, { Fragment } from 'react';
import '../TextInput/TextInput.scss';
import './NumberInput.scss';
import PropTypes from 'prop-types';

const NumberInput = ({ name, handleChange, errors, touched, values}) => {
	if (name === 'age') {
		return (
			<Fragment>
				<input
					type='text'
					pattern='\d*'
					maxLength='3'
					name={name}
					value={values[name]?values[name]: ''}
					placeholder={name}
					onChange={handleChange}
					className={`input-field ${errors[name] &&
						touched[name] &&
						'input-error'}`}
				/>
				{errors[name] !== 'required' && (
					<div className='input-feedback'>{errors[name]}</div>
				)}
			</Fragment>
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
