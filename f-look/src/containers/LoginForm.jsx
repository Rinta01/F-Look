import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../css/Login.scss';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../graphql/queries';
import Input from '../components/Input';
import RadioInput from '../components/RadioInput';

const VALIDATORS = {
	tel: /^((\+7|7|8)+([0-9]){10})$/,
};

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
		};
	}

	render() {
		const { page } = this.state;
		return (
			<Mutation
				mutation={ADD_USER}
				// update={(cache, { data: { addTodo } }) => {
				// 	const { todos } = cache.readQuery({ query: GET_TODOS });
				// 	cache.writeQuery({
				// 		query: GET_TODOS,
				// 		data: { todos: todos.concat([addTodo]) },
				// 	});
				// }}
			>
				{addUser => (
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
							sex: 'Other',
							wealth: 'Average',
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
								console.log('here');
								console.log(values);
								// e.preventDefault();
								// const data = new FormData(e.target);
								// let variables = {};
								// for (let [
								// 	key,
								// 	value,
								// ] of data.entries()) {
								// 	variables[key] = value.trim();
								// }
								// addUser({ variables });
								// e.target.reset();
							}, 500);
						}}
						validationSchema={Yup.object().shape({
							first_name: Yup.string().required('required'),
							last_name: Yup.string().required('required'),
							email: Yup.string()
								.email()
								.required('required'),
							tel: Yup.string()
								.matches(
									VALIDATORS.tel,
									'Phone number is not valid'
								)
								.required('required'),
							age: Yup.number()
								.min(1, 'You are too young')
								.max(100, 'You are too old')
								.required('required'),
							//Match with existing countries!!!!!!!
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
								dirty,
								isSubmitting,
								handleChange,
								handleBlur,
								handleSubmit,
								handleReset,
							} = props;
							return (
								<section className='form-container'>
									<form
										onSubmit={handleSubmit}
										onBlur={handleBlur}>
										<Input
											name='first_name'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<Input
											name='last_name'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<Input
											name='tel'
											onChange={handleChange}
											errors={errors}
											touched={touched}
										/>
										<RadioInput
											name='sex'
											onChange={handleChange}
											values={values}
										/>
										<button
											type='submit'
											disabled={isSubmitting}>
											Submit
										</button>
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

export default LoginForm;
