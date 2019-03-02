import { Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CustomLoader } from '../../components/CustomLoader';
import { RadioInput, TextInput } from '../../components/InputTypes';
import { StatusContainer } from '../../components/StatusContainer';
import { SubmitButton } from '../../components/SubmitButton';
import AuthContext from '../../context/AuthContext';
import { NEW_USER } from '../../graphql/queries';
import './Form.scss';
import { reg_schema } from '../../utils/validators';

class RegForm extends Component {
	static contextType = AuthContext;
	render() {
		return (
			<Mutation
				mutation={NEW_USER}
				onCompleted={({ createUser }) => {
					console.log('Successfully signed up');
					this.context.login(createUser.userId, createUser.token);
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
						validationSchema={reg_schema}>
						{props => {
							const {
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

export default RegForm;
