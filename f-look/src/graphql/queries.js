import gql from 'graphql-tag';

export const LOGIN = gql`
	query($tel: String!, $password: String!) {
		login(tel: $tel, password: $password) {
			userId
			token
			tokenExpiration
		}
	}
`;
export const GET_USERS = gql`
	query {
		allUsers {
			first_name
			last_name
		}
	}
`;

export const EDIT_USER = gql`
	mutation(
		$first_name: String!
		$last_name: String!
		$country: String!
		$tel: String!
		$password: String!
	) {
		editUser(
			first_name: $first_name
			last_name: $last_name
			country: $country
			tel: $tel
			password: $password
		) {
			first_name
			last_name
			country
			tel
		}
	}
`;

export const NEW_USER = gql`
	mutation(
		$first_name: String!
		$tel: String!
		$password: String!
		$sex: String!
	) {
		createUser(
			first_name: $first_name
			tel: $tel
			password: $password
			sex: $sex
		) {
			first_name
			tel
			sex
		}
	}
`;
