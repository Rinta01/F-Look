import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../css/Login.scss';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../graphql/queries';

const VALIDATORS = {
	tel: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
};

class LoginForm extends Component {
	render() {
		return (
			<Mutation
				mutation={ADD_USER}
				// update={(cache, { data: { addTodo } }) => {
				// 	const { todos } = cache.readQuery({ query: GET_TODOS });
				// 	cache.writeQuery({
				// 		query: GET_TODOS,
				// 		data: { todos: todos.concat([addTodo]) },
				// 	});
				// }}
			>
				{addUser => (
					<Formik
						initialValues={{
							first_name: '',
							last_name: '',
							age: '',
							email: '',
							country: '',
							password: '',
							confirm_password: '',
							sex: 'Other',
							wealth: 'Average',
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
								console.log('here');
								// e.preventDefault();
								// const data = new FormData(e.target);
								// let variables = {};
								// for (let [
								// 	key,
								// 	value,
								// ] of data.entries()) {
								// 	variables[key] = value.trim();
								// }
								// addUser({ variables });
								// e.target.reset();
							}, 500);
						}}
						validationSchema={Yup.object().shape({
							first_name: Yup.string().required(),
							last_name: Yup.string().required(),
							email: Yup.string()
								.email()
								.required(),
							tel: Yup.string()
								.matches(
									VALIDATORS.tel,
									'Phone number is not valid'
								)
								.required(),
							age: Yup.number()
								.min(1, 'You are too young')
								.max(100, 'You are too old')
								.required(),
							//Match with existing countries!!!!!!!
							country: Yup.string().required(),
							password: Yup.string()
								.min(6, 'Password is too short')
								.required(),
							confirm_password: Yup.string()
								.oneOf(
									[Yup.ref('password')],
									'Passwords do not match'
								)
								.required(),
						})}>
						{props => {
							const {
								values,
								touched,
								errors,
								dirty,
								isSubmitting,
								handleChange,
								handleBlur,
								handleSubmit,
								handleReset,
							} = props;
							return (
								<section className='form-container'>
									<form
										onSubmit={handleSubmit}
										onBlur={handleBlur}>
										<input
											type='text'
											name='first_name'
                                            placeholder='First Name'
                                            onChange={handleChange}
										/>
										<input
											type='text'
											name='last_name'
                                            placeholder='Last Name'
                                            onChange={handleChange}
										/>
										<input
											type='email'
											name='email'
                                            placeholder='Email'
                                            onChange={handleChange}
										/>
										{errors.email && touched.email && (
											<div className='input-feedback'>
												{errors.email}
											</div>
										)}
										<input
											type='tel'
											name='tel'
                                            placeholder='Phone Number'
                                            onChange={handleChange}
										/>
										<input
											type='number'
											name='age'
											placeholder='Age'
											onChange={handleChange}
										/>
										{errors.age && touched.age && (
											<div className='input-feedback'>
												{errors.age}
											</div>
										)}
										<input
											type='text'
											name='country'
											placeholder='Country'
											// onClick={() => {
											// 	console.log(errors);
                                            // }}
                                            onChange={handleChange}
										/>
										{errors.country && touched.country && (
											<div className='input-feedback'>
												{errors.country}
											</div>
										)}
										<input
											type='password'
											name='password'
                                            placeholder='Password'
                                            onChange={handleChange}
										/>
										{errors.password &&
											touched.password && (
												<div className='input-feedback'>
													{errors.password}
												</div>
											)}
										<input
											type='password'
											name='confirm_password'
                                            placeholder='Confirm Password'
                                            onChange={handleChange}
										/>
										{errors.confirm_password &&
											touched.confirm_password && (
												<div className='input-feedback'>
													{errors.confirm_password}
												</div>
											)}
										<div className='radio-group'>
											<input
												type='radio'
												name='sex'
												value='Male'
												id='sex-male'
												checked={values.sex === 'Male'}
												onChange={handleChange}
											/>
											<label htmlFor='sex-male'>
												Male
											</label>
											<input
												type='radio'
												name='sex'
												value='Female'
												id='sex-female'
												checked={
													values.sex === 'Female'
												}
												onChange={handleChange}
											/>
											<label htmlFor='sex-female'>
												Female
											</label>
											<input
												type='radio'
												name='sex'
												value='Other'
												id='sex-other'
												checked={values.sex === 'Other'}
												onChange={handleChange}
											/>
											<label htmlFor='sex-other'>
												Other
											</label>
										</div>
										<div className='radio-group'>
											<input
												type='radio'
												name='wealth'
												value='Poor'
												id='wealth-poor'
												checked={
													values.wealth === 'Poor'
												}
												onChange={handleChange}
											/>
											<label htmlFor='wealth-poor'>
												Poor
											</label>
											<input
												type='radio'
												name='wealth'
												value='Average'
												id='wealth-average'
												checked={
													values.wealth === 'Average'
												}
												onChange={handleChange}
											/>
											<label htmlFor='wealth-average'>
												Average
											</label>
											<input
												type='radio'
												name='wealth'
												value='Rich'
												id='wealth-rich'
												checked={
													values.wealth === 'Rich'
												}
												onChange={handleChange}
											/>
											<label htmlFor='wealth-rich'>
												Rich
											</label>
										</div>
                                        {/* NOT SUBMITTING!! */}
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

export default LoginForm;
