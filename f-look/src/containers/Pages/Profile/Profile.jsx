import { Formik } from 'formik';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import * as Yup from 'yup';
import { EDIT_USER, GET_USER } from '../../../graphql/queries';
import { TEL } from '../../../utils/validators';
import { TextInput, NumberInput } from '../../../components/InputTypes/Inputs';
import AuthContext from '../../../context/AuthContext';
import StatusContainer from '../../../components/StatusContainer/StatusContainer';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import './Profile.scss';
import Icon from '../../../components/Icon/Icon';
//CSS STYLESHEET

export default class Profile extends Component {
	static contextType = AuthContext;
	constructor(props) {
		super(props);
		this.state = {
			mutationSuccess: false,
		};
	}

	render() {
		return (
			<div className='profile-container'>
				<header>
					<div>
						<h2>Profile</h2>
						<Icon
							className='social-icon'
							icon={'sign-out-alt'}
							onClick={this.context.logout}
						/>
					</div>
					<h4 className='active'>Please fill out your info</h4>
				</header>
				<Query
					query={GET_USER}
					variables={{ userId: this.context.userId }}>
					{({ loading, error, data }) => {
						if (loading) return <CustomLoader loading={loading} />;
						if (error) return <StatusContainer error={error} />;
						else {
							console.log(data);
							const {
								first_name,
								last_name,
								country,
								age,
								tel,
								email,
								wealth,
							} = data.findUser;
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
											onSubmit={async (
												values,
												{ setSubmitting }
											) => {
												setSubmitting(false);
												// console.log(values);
												await editUser({
													variables: {
														...values,
														id: this.context.userId,
														age: +values.age,
													},
												});
											}}
											validationSchema={Yup.object().shape(
												{
													first_name: Yup.string().required(
														'required'
													),
													last_name: Yup.string().nullable(),
													email: Yup.string()
														.email(
															'This must be a valid email'
														)
														.nullable(),
													tel: Yup.string()
														.matches(
															TEL,
															'Phone number is not valid'
														)
														.required('required'),
													age: Yup.number()
														.typeError(
															'Age must be a number'
														)
														.min(
															1,
															'You are too young'
														)
														.max(
															100,
															'You are too old'
														)
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
												}
											)}>
											{props => {
												const {
													isSubmitting,
													handleSubmit,
												} = props;
												return (
													<>
														<section className='form-container profile-page'>
															<form
																onSubmit={
																	handleSubmit
																}>
																<TextInput
																	name='first_name'
																	{...props}
																/>
																<TextInput
																	name='last_name'
																	{...props}
																/>
																<TextInput
																	name='tel'
																	{...props}
																/>
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
																		loading={
																			loading
																		}
																	/>
																) : (
																	<button
																		type='submit'
																		disabled={
																			isSubmitting
																		}>
																		Save
																	</button>
																)}
															</form>
														</section>
														<StatusContainer
															error={error}
														/>
														<StatusContainer
															success={
																this.state
																	.mutationSuccess
															}
														/>
													</>
												);
											}}
										</Formik>
									)}
								</Mutation>
							);
						}
					}}
				</Query>
			</div>
		);
	}
}
