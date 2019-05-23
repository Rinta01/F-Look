/* eslint-disable no-unused-vars */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

const prodBaseUri = 'https://f-back.herokuapp.com';
const localBaseUri = 'http://localhost:4000';
const prodFrontUri = 'https://f-look.herokuapp.com';
const localFrontUri = 'http://localhost:3000';
const graphqlUri = `${localBaseUri}/graphql`;

const httpLink = new HttpLink({
	uri: graphqlUri,
	credentials: 'include',
});
const errorLink = onError(({ response, graphQLErrors, networkError }) => {
	if (graphQLErrors) graphQLErrors.map(({ message, path }) => console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`));
	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
	// return graphQLErrors;
});
const authLink = setContext((_, { headers = {} }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// console.log(token);
	// const requestHeaders = { ...{ ...headers, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			// ...requestHeaders,
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});
export const client = new ApolloClient({
	link: ApolloLink.from([ authLink, errorLink, httpLink ]),
	cache: new InMemoryCache(),
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
	},
	mutate: {
		errorPolicy: 'all',
	},
});
