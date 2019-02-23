import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebookSquare,
	faGooglePlusSquare,
	faVk,
} from '@fortawesome/free-brands-svg-icons';
import {
	faSignOutAlt,
	faSearch,
	faCheck,
} from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import Login from '../components/Login/Login';
import Start from '../components/Start/Start';
import Profile from '../containers/Pages/Profile/Profile';
import AuthContext from '../context/AuthContext';
import { client } from '../utils/apolloConfig';

library.add(
	faFacebookSquare,
	faVk,
	faGooglePlusSquare,
	faSignOutAlt,
	faSearch,
	faCheck
);

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

	login = async (userId, token) => {
		await this.setState({ userId, token });
	};

	logout = async () => {
		await this.setState({ userId: null, token: null });
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
						</Switch>
					</AuthContext.Provider>
				</Router>
			</ApolloProvider>
		);
	}
}
