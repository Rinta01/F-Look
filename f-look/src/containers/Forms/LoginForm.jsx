import { Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import { TextInput } from '../../components/InputTypes/Inputs';
import StatusContainer from '../../components/StatusContainer/StatusContainer';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import AuthContext from '../../context/AuthContext';
import { LOGIN } from '../../graphql/queries';
import { TEL } from '../../utils/validators';
import './Form.scss';

export default class LoginForm extends Component {
	static contextType = AuthContext;
	render() {
		return (
			<Mutation
				mutation={LOGIN}
				onCompleted={({ login }) => {
					console.log('Successfully authorized');
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
								variables: {
									tel: values.tel,
									password: values.password,
								},
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
							const { isSubmitting, handleSubmit } = props;
							return (
								<section className='form-container'>
									<form onSubmit={handleSubmit}>
										<TextInput name='tel' {...props} />
										<TextInput name='password' {...props} />
										{loading ? (
											<CustomLoader loading={loading} />
										) : (
											<SubmitButton
												disabled={isSubmitting}
											/>
										)}
										{error && (
											<StatusContainer error={error} />
										)}
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
