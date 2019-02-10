import { Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup';
import { NEW_USER } from '../../graphql/queries';
import { TEL } from '../../utils/validators';
import TextInput from '../../components/InputTypes/TextInput/TextInput';
import RadioInput from '../../components/InputTypes/RadioInput/RadioInput';

class RegForm extends Component {
	render() {
		return (
			<Mutation
				mutation={NEW_USER}
				onCompleted={() => {
					console.log('YAY');
				}}>
				{(newUser, { loading, error, data }) => (
					<Formik
						initialValues={{
							first_name: '',
							password: '',
							tel: '',
							confirm_password: '',
							sex: 'Male',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setTimeout(async () => {
								setSubmitting(false);
								const res = await newUser({
									variables: values,
								});
								console.log(res);
								// this.props.getNumber(values.tel);
							}, 500);
						}}
						validationSchema={Yup.object().shape({
							first_name: Yup.string().required('required'),
							tel: Yup.string()
								.matches(TEL, 'Phone number is not valid')
								.required('required'),
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
								<Fragment>
									<form onSubmit={handleSubmit}>
										<TextInput
											name='first_name'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<TextInput
											name='tel'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<TextInput
											name='password'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<TextInput
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
									{loading && (
										<Loader
											className='loader'
											type='Bars'
											color='#b97fff'
											height='50px'
											width='50px'
										/>
									)}
									{error &&
										(error.message.includes('duplicate') ? (
											<p className='input-feedback'>
												This phone number is already
												registered!
											</p>
										) : (
											<p>{error.message}</p>
										))}
								</Fragment>
							);
						}}
					</Formik>
				)}
			</Mutation>
		);
	}
}

export default RegForm;
