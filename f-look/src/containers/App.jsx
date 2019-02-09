import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebookSquare,
	faGoogle,
	faVk,
	faGooglePlusSquare,
} from '@fortawesome/free-brands-svg-icons';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Start from '../components/Start';
import Login from '../components/Login';
import Profile from '../containers/Profile';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import AuthContext from './AuthContext';

library.add(faFacebookSquare, faGoogle, faVk, faGooglePlusSquare);

const graphqlUri = 'http://localhost:4000/graphql';
const httpLink = new HttpLink({
	uri: graphqlUri,
});
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
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

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: null,
			token: null,
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login = (userId, token) => {
		this.setState({ userId, token });
	};

	logout = () => {
		this.setState({ userId: null, token: null });
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<AuthContext.Provider
						value={{
							userId: this.state.userId,
							token: this.state.token,
							login: this.login,
							logout: this.logout,
						}}>
						<Switch>
						{this.state.token && (
								<Redirect from='/login' to='/profile' />
							)}
							{this.state.token && (
								<Redirect from='/signup' to='/profile' />
							)}
							{!this.state.token && (
								<Redirect from='/confirm' to='/login' />
							)}
							{!this.state.token && (
								<Redirect from='/profile' to='/login' />
							)}
							<Route exact path='/' component={Start} />
							<Route
								exact
								path='/login'
								render={() => <Login signup={false} />}
							/>
							<Route
								exact
								path='/signup'
								render={() => <Login signup={true} />}
							/>
							<Route exact path='/profile' component={Profile} />
							<Route
								exact
								path='/confirm'
								render={() => <div>NOT THERE YET</div>}
							/>
						</Switch>
					</AuthContext.Provider>
				</Router>
			</ApolloProvider>
		);
	}
}
