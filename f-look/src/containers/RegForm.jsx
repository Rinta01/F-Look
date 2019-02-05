import { Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import Input from '../components/Input';
import RadioInput from '../components/RadioInput';
import '../css/Login.scss';
import { TEL } from '../utils/validators';
import { NEW_USER, GET_USERS } from '../graphql/queries';

class RegForm extends Component {
	render() {
		const { getNumber, history } = this.props;
		return (
			<Mutation
				mutation={NEW_USER}
				update={(cache, { data: { newUser } }) => {
					const { users } = cache.readQuery({ query: GET_USERS });
					cache.writeQuery({
						query: GET_USERS,
						data: { users: users.concat([newUser]) },
					});
				}}>
				{newUser => (
					<Formik
						initialValues={{
							first_name: '',
							// last_name: '',
							// age: '',
							// email: '',
							// country: '',
							password: '',
							tel: '',
							confirm_password: '',
							sex: 'Male',
							// wealth: 'Average',
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
								// console.log(values);
								newUser({ variables: values });
								getNumber(history, values.tel);
							}, 500);
						}}
						validationSchema={Yup.object().shape({
							first_name: Yup.string().required('required'),
							// last_name: Yup.string().required('required'),
							// email: Yup.string()
							// 	.email()
							// 	.required('required'),
							tel: Yup.string()
								.matches(TEL, 'Phone number is not valid')
								.required('required'),
							// age: Yup.number()
							// 	.min(1, 'You are too young')
							// 	.max(100, 'You are too old')
							// 	.required('required'),
							//Match with existing countries!!!!!!!
							// country: Yup.string().required('required'),
							password: Yup.string()
								.min(6, 'Password is too short')
								.required('required'),
							confirm_password: Yup.string()
								.oneOf(
									[Yup.ref('password')],
									'Passwords do not match'
								)
								.required('required'),
						})}>
						{props => {
							const {
								values,
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
											name='first_name'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
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
										<Input
											name='confirm_password'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<RadioInput
											name='sex'
											onChange={handleChange}
											values={values}
										/>
										<button
											type='submit'
											disabled={isSubmitting}>
											Submit
										</button>
									</form>
								</section>
							);
						}}
					</Formik>
				)}
			</Mutation>
		);
	}
}

export default RegForm;
