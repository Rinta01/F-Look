import * as Yup from 'yup';

export const tel_schema = /^((\+7|7|8)+([0-9]){10})$/;

export const profile_schema = Yup.object().shape({
	first_name: Yup.string().required('required'),
	last_name: Yup.string().nullable(),
	email: Yup.string()
		.email('This must be a valid email')
		.nullable(),
	tel: Yup.string()
		.matches(tel_schema, 'Phone number is not valid')
		.required('required'),
	age: Yup.number()
		.typeError('Age must be a number')
		.min(1, 'You are too young')
		.max(100, 'You are too old')
		.nullable(),
	// Match with existing countries!!!!!!!
	country: Yup.string()
		.oneOf(
			['Russia', 'US', 'UK', 'Germany', 'China', 'France'],
			'The country must be one of: Russia, US, UK, Germany, China, France'
		)
		.nullable(),
	size: Yup.string()
		.nullable()
		.required('Enter your size'),
	// password: Yup.string().min(
	// 	6,
	// 	'Password is too short'
	// ),
	// confirm_password: Yup.string().oneOf(
	// 	[Yup.ref('password')],
	// 	'Passwords do not match'
	// ),
});

export const login_schema = Yup.object().shape({
	tel: Yup.string()
		.matches(tel_schema, 'Phone number is not valid')
		.required('required'),
	password: Yup.string()
		.min(6, 'Password is too short')
		.required('required'),
});

export const reg_schema = Yup.object().shape({
	first_name: Yup.string().required('required'),
	tel: Yup.string()
		.matches(tel_schema, 'Phone number is not valid')
		.required('required'),
	password: Yup.string()
		.min(6, 'Password is too short')
		.required('required'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords do not match')
		.required('required'),
});
