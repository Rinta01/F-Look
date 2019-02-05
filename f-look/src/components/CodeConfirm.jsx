import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import '../css/Login.scss';
import NumberInput from './NumberInput';

const CodeConfirm = ({phone}) => {
	return (
		<div className='code-confirm'>
			<h5>Enter the confirmation code sent to your phone</h5>
			<span id='tel-num'>{phone}</span>
			<Formik
				initialValues={{
					1: '',
					2: '',
					3: '',
					4: '',
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
						console.log(values);
					}, 500);
				}}
				validationSchema={Yup.object().shape({
					1: Yup.number()
						.min(0)
						.max(9)
						.required(),
					2: Yup.number()
						.min(0)
						.max(9)
						.required(),
					3: Yup.number()
						.min(0)
						.max(9)
						.required(),
					4: Yup.number()
						.min(0)
						.max(9)
						.required(),
				})}>
				{props => {
					const {
						touched,
						errors,
						handleChange,
						handleSubmit,
                    } = props;
					return (
						<form className='code-boxes' onSubmit={handleSubmit}>
							<NumberInput name='1' onChange={handleChange} errors={errors} touched={touched}/>
							<NumberInput name='2' onChange={handleChange} errors={errors} touched={touched}/>
							<NumberInput name='3' onChange={handleChange} errors={errors} touched={touched}/>
							<NumberInput name='4' onChange={handleChange} errors={errors} touched={touched}/>
							<button type="submit"></button>
						</form>
					);
				}}
			</Formik>
			<h5>Re-send the code</h5>
		</div>
	);
};

export default CodeConfirm;
