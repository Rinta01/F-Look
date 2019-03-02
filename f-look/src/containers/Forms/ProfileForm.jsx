import React, { Component } from 'react';
import { TextInput, NumberInput } from '../../components/InputTypes';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { EDIT_USER } from '../../graphql/queries';
import { StatusContainer } from '../../components/StatusContainer';
import { CustomLoader } from '../../components/CustomLoader';
import PropTypes from 'prop-types';
import { SizeChoice } from '../../components/SizeChoice';
import AuthContext from '../../context/AuthContext';
import { profile_schema } from '../../utils/validators';
import { PasswordChange } from '../../components/PasswordChange';
import { SubmitButton } from '../../components/SubmitButton';

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
							size,
							// password: '',
							// confirm_password: '',
						}}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(false);
							alert(JSON.stringify(values));
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
