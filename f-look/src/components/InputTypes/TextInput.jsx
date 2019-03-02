import React, { Component } from 'react';
import './Input.scss';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage';

export default class TextInput extends Component {
	static propTypes = {
		name: PropTypes.string,
		handleChange: PropTypes.func,
		errors: PropTypes.object,
		touched: PropTypes.object,
	};

	getInput({ name } = this.props) {
		switch (name) {
			case 'first_name':
				return {
					type: 'text',
					name,
					placeholder: 'First Name',
				};
			case 'last_name':
				return {
					type: 'text',
					name,
					placeholder: 'Last Name',
				};
			case 'email':
				return {
					type: 'email',
					name,
					placeholder: 'Email',
				};
			case 'tel':
				return {
					type: 'tel',
					name,
					placeholder: 'Phone Number',
				};
			case 'age':
				return {
					type: 'number',
					name,
					placeholder: 'Age',
				};
			case 'country':
				return {
					type: 'text',
					name,
					placeholder: 'Country',
				};
			case 'password':
				return {
					type: 'password',
					name,
					placeholder: 'Password',
				};
			case 'confirm_password':
				return {
					type: 'password',
					name,
					placeholder: 'Confirm Password',
				};
			default:
				return {};
		}
	}

	render() {
		const { type, name, placeholder } = this.getInput();
		const { values, handleChange, errors, touched } = this.props;

		return (
			<div className='styled-input'>
				<label htmlFor={`${name}-input`}>
					{placeholder.toUpperCase()}
				</label>
				<input
					type={type}
					id={`${name}-input`}
					name={name}
					// placeholder={placeholder}
					onChange={handleChange}
					value={values[name] ? values[name] : ''}
					className={`input-field	${
						(errors[name] === 'required' & touched[name])
							? 'input-error'
							: ''
					}`}
				/>
				<ErrorMessage {...{ errors, name }} />
			</div>
		);
	}
}
