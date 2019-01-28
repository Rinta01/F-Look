import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle, faVk, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';
import { default as ApolloClient } from 'apollo-boost';
import React, { Component } from 'react';
import Start from '../components/Start';
import Login from '../components/Login';
import '../css/App.scss';
import { ApolloProvider } from 'react-apollo';

library.add(faFacebookSquare, faGoogle, faVk, faGooglePlusSquare);

const graphqlUri = 'http://localhost:4000/graphql';
const client = new ApolloClient({
	uri: graphqlUri,
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
				<div className='App'>
					{this.state.start ? (
						<Start onClick={this.startApp} />
					) : null}
					{!this.state.start ? <Login /> : null}
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
