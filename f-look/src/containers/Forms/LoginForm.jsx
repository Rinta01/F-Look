import { Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';
import { LOGIN } from '../../graphql/queries';
import { TEL } from '../../utils/validators';
import { TextInput } from '../../components/InputTypes/Inputs';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import ErrorContainer from '../../components/ErrorContainer/ErrorContainer';
import './Form.scss';

export default class LoginForm extends Component {
	static contextType = AuthContext;
	render() {
		return (
			<Mutation
				mutation={LOGIN}
				onCompleted={({ login }) => {
					console.log('YAY');
					this.context.login(login.userId, login.token);
				}}
				onError={err => {
					console.log(err.graphQLErrors, err.networkError);
				}}>
				{(login, { loading, error }) => (
					<Formik
						initialValues={{
							tel: '',
							password: '',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							await login({
								variables: values,
							});
							//This is a redirect to phone number confirmation
							// this.props.getNumber(values.tel);
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
										{loading ? (
											<CustomLoader loading={loading} />
										) : (
											<button
												type='submit'
												disabled={isSubmitting}>
												Submit
											</button>
										)}
										<ErrorContainer error={error} />
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
