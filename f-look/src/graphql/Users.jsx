import React from 'react';
import { Query } from 'react-apollo';
import { GET_USERS } from './queries';

const randomiser = num => Math.floor(Math.random() * 10000);

const Users = () => (
	<Query query={GET_USERS}>
		{({ loading, error, data }) => {
			console.log(data);
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return (
				<ul>
					{data.users
						? data.users.map((u, i) => {
								console.log(u, i);
								return (
									<li key={randomiser(i)}>{u.first_name}</li>
								);
						  })
						: null}
				</ul>
			);
		}}
	</Query>
);

export default Users;
