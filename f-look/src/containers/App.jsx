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
import { ApolloProvider } from 'react-apollo';

library.add(faFacebookSquare, faGoogle, faVk, faGooglePlusSquare);

const graphqlUri = 'http://localhost:4000/graphql';
const client = new ApolloClient({
	link: new HttpLink({
		uri: graphqlUri,
		// credentials: 'include'
	}),
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
		this.state = {};
	}

	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<Switch>
						<Route exact path='/' component={Start} />
						<Route exact path='/login' component={Login} />
						{/* should depend on authorization?? */}
						<Route
							exact
							path='/signup'
							render={() => <Redirect to='/login' />}
						/>
						{/* should depend on authorization?? */}
						<Route
							exact
							path='/confirm'
							render={() => <div>NOT THERE YET</div>}
						/>
					</Switch>
				</Router>
			</ApolloProvider>
		);
	}
}
