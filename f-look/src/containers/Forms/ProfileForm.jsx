import React, { Component } from 'react';
import { TEL } from '../../utils/validators';
import { TextInput, NumberInput } from '../../components/InputTypes/Inputs';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import { EDIT_USER } from '../../graphql/queries';
import StatusContainer from '../../components/StatusContainer/StatusContainer';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import PropTypes from 'prop-types';
import SizeChoice from '../../components/SizeChoice/SizeChoice';
import AuthContext from '../../context/AuthContext';

class ProfileForm extends Component {
	static contextType = AuthContext;
	constructor(props) {
		super(props);
		this.state = {
			mutationSuccess: false,
		};
	}
	render() {
		const {
			first_name,
			last_name,
			country,
			age,
			tel,
			email,
			// wealth,
		} = this.props;
		return (
			<Mutation
				mutation={EDIT_USER}
				onCompleted={async () => {
					this.setState({
						mutationSuccess: true,
					});
				}}
				onError={async () => {
					this.setState({
						mutationSuccess: false,
					});
				}}>
				{(editUser, { loading, error }) => (
					<Formik
						initialValues={{
							first_name,
							last_name,
							age,
							email,
							country,
							tel,
							wealth: 'Average',
							// password: '',
							// confirm_password: '',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							await editUser({
								variables: {
									...values,
									id: this.context.userId,
									age: +values.age,
								},
							});
						}}
						validationSchema={Yup.object().shape({
							first_name: Yup.string().required('required'),
							last_name: Yup.string().nullable(),
							email: Yup.string()
								.email('This must be a valid email')
								.nullable(),
							tel: Yup.string()
								.matches(TEL, 'Phone number is not valid')
								.required('required'),
							age: Yup.number()
								.typeError('Age must be a number')
								.min(1, 'You are too young')
								.max(100, 'You are too old')
								.nullable(),
							// Match with existing countries!!!!!!!
							country: Yup.string()
								.oneOf(
									[
										'Russia',
										'US',
										'UK',
										'Germany',
										'China',
										'France',
									],
									'The country must be one of: Russia, US, UK, Germany, China, France'
								)
								.nullable(),
							// password: Yup.string().min(
							// 	6,
							// 	'Password is too short'
							// ),
							// confirm_password: Yup.string().oneOf(
							// 	[Yup.ref('password')],
							// 	'Passwords do not match'
							// ),
						})}>
						{props => {
							const { isSubmitting, handleSubmit } = props;
							return (
								<>
									<section className='form-container profile-page'>
										<form onSubmit={handleSubmit}>
											<TextInput
												name='first_name'
												{...props}
											/>
											<TextInput
												name='last_name'
												{...props}
											/>
											<TextInput name='tel' {...props} />
											<TextInput
												name='country'
												{...props}
											/>
											<TextInput
												name='email'
												{...props}
											/>
											<NumberInput
												name='age'
												{...props}
											/>
											<SizeChoice />
											{/* <TextInput
                                        name='password'
                                        {...props}
                                    />
                                    <TextInput
                                        name='confirm_password'
                                        {...props}
                                    /> */}
											{loading ? (
												<CustomLoader
													loading={loading}
												/>
											) : (
												<button
													type='submit'
													disabled={isSubmitting}>
													Save
												</button>
											)}
										</form>
									</section>
									{error && <StatusContainer error={error} />}
									{this.state.mutationSuccess && (
										<StatusContainer
											success={this.state.mutationSuccess}
											handleUnmount={async () => {
												await this.setState({
													mutationSuccess: false,
												});
												console.log('changed');
											}}
										/>
									)}
								</>
							);
						}}
					</Formik>
				)}
			</Mutation>
		);
	}
	static propTypes = {
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		country: PropTypes.string,
		age: PropTypes.number,
		tel: PropTypes.string,
		email: PropTypes.string,
	};
}

export default ProfileForm;
