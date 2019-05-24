import React from 'react';
import { Icon } from '..';
import './StatusContainer.scss';

const StatusContainer = ({ error, success, handleUnmount, graphql }) => {
	// console.log({ ...error });
	// const [ renderChild, setState ] = useState(1);
	// console.log(error, success, handleUnmount);

	// useEffect(() => {
	// 	let interval = setTimeout(() => setState(!renderChild), 3500);
	// 	return () => {
	// 		clearInterval(interval);
	// 		// if (handleUnmount !== undefined) {
	// 		// 	console.log('eee');
	// 		// 	handleUnmount();
	// 		// }
	// 	};
	// }, []);

	if (error) {
		console.log(error.graphQLErrors, error.networkError, error.message);
		if (graphql) {
			return (
				<p className='input-feedback'>
					{error.networkError && error.networkError.result ? (
						error.networkError.result.errors.length && error.networkError.result.errors.map(m => m.message.split(': '))
					) : typeof error.networkError === 'string' ? (
						error.networkError
					) : null}
					{error.graphQLErrors ? (
						error.graphQLErrors.map(({ message, path }) => `[GraphQL error]: Message: ${message}, Path: ${path}`)
					) : null}
				</p>
			);
		}
		return (
			<p className='input-feedback'>
				{error.message.includes('duplicate') ? 'This phone number is already registered!' : `${error.message.split(': ')[1]}`}
			</p>
		);
	}
	else if (success) {
		return (
			<p className='input-feedback success'>
				<Icon icon='check' />
			</p>
		);
	}
	else return null;
};

export default StatusContainer;
