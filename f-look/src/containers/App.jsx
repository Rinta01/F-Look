import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebookSquare,
	faGoogle,
	faVk,
	faGooglePlusSquare,
} from '@fortawesome/free-brands-svg-icons';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import React from 'react';
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

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route exact path='/login' component={Login} />
					{/* should depend on authorisation?? */}
					<Route
						exact
						path='/signup'
						render={() => <Redirect to='/login' />}
					/>
					<Route exact path='/' component={Start} />
					{/* should depend on authorisation?? */}
					<Route
						exact
						path='/confirm'
						render={() => <div>NOT THERE YET</div>}
					/>
				</Switch>
			</Router>
		</ApolloProvider>
	);
};

export default App;
