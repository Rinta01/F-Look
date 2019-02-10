import { Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { EDIT_USER } from '../../../graphql/queries';
import { TEL } from '../../../utils/validators';
import { TextInput, RadioInput } from '../../../components/InputTypes/Inputs';
import AuthContext from '../../../context/AuthContext';
import ErrorContainer from '../../../components/ErrorContainer/ErrorContainer';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import './Profile.scss';
import '../../../components/LoginFooter/LoginFooter.scss';
import Icon from '../../../components/Icon/Icon';
//CSS STYLESHEET

export default class Profile extends Component {
	static contextType = AuthContext;
	render() {
		return (
			<div className='container'>
				<Icon className='social-icon' icon={'sign-out-alt'} onClick={this.context.logout} />
				<Mutation
					mutation={EDIT_USER}
					onCompleted={() => {
						console.log('YAY');
					}}>
					{(editUser, { loading, error, data }) => (
						<Formik
							initialValues={{
								first_name: '',
								last_name: '',
								age: '',
								email: '',
								country: '',
								password: '',
								tel: '',
								confirm_password: '',
								sex: 'Male',
								wealth: 'Average',
							}}
							onSubmit={async (values, { setSubmitting }) => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
								// console.log(values);
								await editUser({
									variables: values,
								});
							}}
							validationSchema={Yup.object().shape({
								first_name: Yup.string().required('required'),
								last_name: Yup.string().required('required'),
								email: Yup.string()
									.email()
									.required('required'),
								tel: Yup.string()
									.matches(TEL, 'Phone number is not valid')
									.required('required'),
								age: Yup.number()
									.min(1, 'You are too young')
									.max(100, 'You are too old')
									.required('required'),
								// Match with existing countries!!!!!!!
								country: Yup.string().required('required'),
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
										<section className='form-container profile-page'>
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
										{loading ? (
											<CustomLoader loading={loading} />
										) : (
											<button
												type='submit'
												disabled={isSubmitting}>
												Submit
											</button>
										)}
											</form>
										</section>
										<ErrorContainer />
									</Fragment>
								);
							}}
						</Formik>
					)}
				</Mutation>
			</div>
		);
	}
}
