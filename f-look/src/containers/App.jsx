import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle, faGooglePlusSquare, faVk } from '@fortawesome/free-brands-svg-icons';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Start from '../components/Start/Start';
import Profile from '../containers/Pages/Profile';
import AuthContext from '../context/AuthContext';
import { client } from '../utils/apolloConfig';

library.add(faFacebookSquare, faGoogle, faVk, faGooglePlusSquare);

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
