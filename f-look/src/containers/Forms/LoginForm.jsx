import { Formik } from 'formik';
import React, { Component, useContext } from 'react';
import { Mutation } from 'react-apollo';
import { CustomLoader, StatusContainer, SubmitButton, TextInput } from '../../components';
import AuthContext from '../../context/AuthContext';
import { LOGIN } from '../../graphql/queries';
import { login_schema } from '../../utils/validators';
import './Form.scss';

const LoginForm = () => {
	const context = useContext(AuthContext);
	return (
		<Mutation
			mutation={LOGIN}
			onCompleted={({ login }) => {
				console.log('Successfully authorized');
				context.login(login.userId, login.token);
			}}
			onError={err => {
				console.log({ ...err });
				// notification.addNotification({ message: err.networkErrors[0].message });
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
							variables: {
								tel: values.tel,
								password: values.password,
							},
						});
						//This is a redirect to phone number confirmation
						// this.props.getNumber(values.tel);
					}}
					validationSchema={login_schema}>
					{props => {
						const { isSubmitting, handleSubmit } = props;
						return (
							<section className='form-container'>
								<form onSubmit={handleSubmit}>
									<TextInput name='tel' {...props} />
									<TextInput name='password' {...props} />
									{loading ? (
										<CustomLoader loading={loading} />
									) : (
										<SubmitButton disabled={isSubmitting} />
									)}
									{error && <StatusContainer error={error} graphql />}
								</form>
							</section>
						);
					}}
				</Formik>
			)}
		</Mutation>
	);
};

export default LoginForm;
