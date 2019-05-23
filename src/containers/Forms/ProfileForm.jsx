import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CustomLoader, PasswordChange, SizeChoice, StatusContainer, SubmitButton } from '../../components';
import { NumberInput, RadioInput, TextInput } from '../../components/InputTypes';
import AuthContext from '../../context/AuthContext';
import { EDIT_USER } from '../../graphql/queries';
import { profile_schema } from '../../utils/validators';

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
			sex,
			size,
			// wealth,
		} = this.props;
		return (
			<Mutation
				mutation={EDIT_USER}
				onCompleted={async () => {
					this.setState({
						mutationSuccess: true,
					});

					this.props.refetch({ id: this.context.userId });
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
							sex,
							wealth: 'Average',
							size,
							// password: '',
							// confirm_password: '',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							// alert(JSON.stringify(values));
							await editUser({
								variables: {
									...values,
									id: this.context.userId,
									age: +values.age,
								},
							});
						}}
						validationSchema={profile_schema}>
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
											<RadioInput name='sex' {...props} />
											<SizeChoice {...props} />
											<PasswordChange {...props} />
											{loading ? (
												<CustomLoader
													loading={loading}
												/>
											) : (
												<SubmitButton
													{...{ isSubmitting }}
												/>
											)}
										</form>
									</section>
									{error && (
										<StatusContainer {...{ error }} />
									)}
									{this.state.mutationSuccess && (
										<StatusContainer
											success={this.state.mutationSuccess}
											handleUnmount={() => {
												this.setState({
													mutationSuccess: false,
												});
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
