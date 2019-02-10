import React, { Component } from 'react';
import './RadioInput.scss';
import PropTypes from 'prop-types';

export default class RadioInput extends Component {
	static propTypes = {
		name: PropTypes.string,
		onChange: PropTypes.func,
		values: PropTypes.object,
	};

	getRadio({ name } = this.props) {
		switch (name) {
			case 'sex':
				return {
					name: 'sex',
					value1: 'Male',
					id1: 'sex-male',
					value2: 'Female',
					id2: 'sex-female',
				};
			case 'wealth':
				return {
					name: 'wealth',
					value1: 'Poor',
					id1: 'wealth-poor',
					value2: 'Average',
					id2: 'wealth-average',
					value3: 'Rich',
					id3: 'wealth-rich',
				};
			default:
				return {};
		}
	}

	render() {
		const { name, value1, id1, value2, id2 } = this.getRadio();
		const { onChange, values } = this.props;
		return (
			<div className='radio-group'>
				<input
					type='radio'
					name={name}
					value={value1}
					id={id1}
					checked={values[name] === value1}
					onChange={onChange}
				/>
				<label htmlFor={id1}>{value1}</label>
				<input
					type='radio'
					name={name}
					value={value2}
					id={id2}
					checked={values[name] === value2}
					onChange={onChange}
				/>
				<label htmlFor={id2}>{value2}</label>
			</div>
		);
	}
}
