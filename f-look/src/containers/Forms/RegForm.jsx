import { Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { NEW_USER } from '../../graphql/queries';
import { TEL } from '../../utils/validators';
import { TextInput, RadioInput } from '../../components/InputTypes/Inputs';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import StatusContainer from '../../components/StatusContainer/StatusContainer';
import './Form.scss';

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
							setSubmitting(false);
							await newUser({
								variables: values,
							});
							// this.props.getNumber(values.tel);
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
								// values,
								// touched,
								// errors,
								// handleChange,
								isSubmitting,
								handleSubmit,
							} = props;
							return (
								<section className='form-container'>
									<form onSubmit={handleSubmit}>
										<TextInput
											name='first_name'
											{...props}
										/>
										<TextInput name='tel' {...props} />
										<TextInput name='password' {...props} />
										<TextInput
											name='confirm_password'
											{...props}
										/>
										<RadioInput name='sex' {...props} />
										{loading ? (
											<CustomLoader loading={loading} />
										) : (
											<button
												type='submit'
												disabled={isSubmitting}>
												Submit
											</button>
										)}
										<StatusContainer error={error} />
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
