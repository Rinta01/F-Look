import React, { Component, Fragment } from 'react';
import './TextInput.scss';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
	static propTypes = {
		name: PropTypes.string,
		onChange: PropTypes.func,
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
		const { onChange, errors, touched } = this.props;

		return (
			<Fragment>
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={onChange}
					className={`input-field	${errors[name] === 'required' &&
						touched[name] &&
						'input-error'}`}
				/>
				{errors[name] !== 'required' && (
					<div className='input-feedback'>{errors[name]}</div>
				)}
			</Fragment>
		);
	}
}
