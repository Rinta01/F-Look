import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../css/Login.scss';
import Input from '../components/Input';
import { TEL } from '../utils/validators';
export default class LoginForm extends Component {
	render() {
		return (
			<Formik
				initialValues={{
					tel: '',
					password: '',
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
						// console.log(values);
					}, 500);
				}}
				validationSchema={Yup.object().shape({
					tel: Yup.string()
						.matches(TEL, 'Phone number is not valid')
						.required('required'),
					password: Yup.string()
						.min(6, 'Password is too short')
						.required('required'),
				})}>
				{props => {
					const {
						touched,
						errors,
						isSubmitting,
						handleChange,
						handleSubmit,
					} = props;
					return (
						<section className='form-container'>
							<form onSubmit={handleSubmit}>
								<Input
									name='tel'
									onChange={handleChange}
									errors={errors}
									touched={touched}
								/>
								<Input
									name='password'
									onChange={handleChange}
									errors={errors}
									touched={touched}
								/>
								<button type='submit' disabled={isSubmitting}>
									Submit
								</button>
							</form>
						</section>
					);
				}}
			</Formik>
		);
	}
}
