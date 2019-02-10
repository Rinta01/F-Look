import { Formik } from 'formik';
import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';
import { LOGIN } from '../../graphql/queries';
import { TEL } from '../../utils/validators';
import TextInput from '../../components/InputTypes/TextInput/TextInput';

export default class LoginForm extends Component {
	static contextType = AuthContext;
	render() {
		return (
			<ApolloConsumer>
				{client => (
					<Formik
						initialValues={{
							tel: '',
							password: '',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							const res = await client.query({
								query: LOGIN,
								variables: values,
							});
							//This is a redirect to phone number confirmation
							// this.props.getNumber(values.tel);
							console.log(res);
							if (res.data.login) {
								console.log(this.context);
								this.context.login(
									res.data.login.userId,
									res.data.login.token
								);
							}
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
									<button
										type='submit'
										disabled={isSubmitting}>
										Submit
									</button>
								</form>
							);
						}}
					</Formik>
				)}
			</ApolloConsumer>
		);
	}
}
