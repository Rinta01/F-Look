import gql from 'graphql-tag';

export const LOGIN = gql`
	mutation($tel: String!, $password: String!) {
		login(tel: $tel, password: $password) {
			userId
			token
			tokenExpiration
			# id
			# first_name
			# last_name
			# country
			# tel
			# email
			# sex
			# age
			# wealth
			# size
			# favBrands
			# wishlist {
			# 	id
			# 	article
			# 	brand
			# 	name
			# 	sex
			# 	category
			# 	materials {
			# 		name
			# 		share
			# 	}
			# 	color
			# 	image
			# 	source
			# 	price
			# }
		}
	}
`;
// export const GET_USERS = gql`
// 	query {
// 		allUsers {
// 			first_name
// 			last_name
// 		}
// 	}
// `;

export const GET_USER = gql`
	query($userId: String!) {
		findUser(userId: $userId) {
			id
			first_name
			last_name
			country
			tel
			email
			sex
			age
			wealth
			size
			favBrands
			wishlist {
				id
				article
				brand
				name
				sex
				category
				materials {
					name
					share
				}
				color
				image
				source
				price
			}
		}
	}
`;

export const EDIT_USER = gql`
	mutation(
		$id: String!
		$first_name: String!
		$last_name: String
		$country: String
		$tel: String!
		$email: String
		$age: Int
		$sex: String!
		$wealth: String!
		$size: String!
	) {
		editUser(
			editUserInput: {
				id: $id
				first_name: $first_name
				last_name: $last_name
				country: $country
				tel: $tel
				email: $email
				age: $age
				sex: $sex
				wealth: $wealth
				size: $size
			}
		) {
			id
			first_name
			tel
		}
	}
`;

export const NEW_USER = gql`
	mutation($first_name: String!, $tel: String!, $password: String!, $sex: String!) {
		createUser(userInput: { first_name: $first_name, tel: $tel, password: $password, sex: $sex }) {
			first_name
			tel
			sex
			userId
			token
			tokenExpiration
		}
	}
`;

export const GET_ALL_APPAREL = gql`
	query {
		allApparel {
			id
			article
			brand
			name
			sex
			category
			materials {
				name
				share
			}
			color
			image
			source
			price
		}
	}
`;

export const GET_RECOMMENDED = gql`
	query($itemId: String!) {
		recommended(itemId: $itemId) {
			id
			article
			brand
			name
			sex
			category
			materials {
				name
				share
			}
			color
			image
			source
			price
		}
	}
`;
export const ADD_TO_WISHLIST = gql`
	mutation($userId: String!, $itemId: String!) {
		addToWishlist(userId: $userId, itemId: $itemId) {
			item {
				id
				article
				brand
				name
				sex
				category
				materials {
					name
					share
				}
				color
				image
				source
				price
			}
			status
		}
	}
`;
