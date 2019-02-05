import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebookSquare,
	faGoogle,
	faVk,
	faGooglePlusSquare,
} from '@fortawesome/free-brands-svg-icons';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from '../components/Start';
import Login from '../components/Login';
import { ApolloProvider } from 'react-apollo';

library.add(faFacebookSquare, faGoogle, faVk, faGooglePlusSquare);

const graphqlUri = 'http://localhost:4000/graphql';
const client = new ApolloClient({
	link: new HttpLink({ uri: graphqlUri }),
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

class App extends Component {
	startApp = () => {
		this.setState({
			start: false,
		});
	};

	constructor(props) {
		super(props);
		this.state = {
			start: true,
		};
		this.startApp = this.startApp.bind(this);
	}
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<Switch>
						<Route exact path='/login' component={Login} />
						<Route exact path='/' component={Start} />
					</Switch>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;