import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGooglePlusSquare, faVk } from '@fortawesome/free-brands-svg-icons';
import { faBarcode, faCheck, faEye, faMinus, faPlus, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import NotificationsContext from '../context/NotificationsContext';
import { client } from '../utils/apolloConfig';
import { Login, Main, NotFound, Profile, Start } from './Pages';

library.add(
	faFacebookSquare,
	faVk,
	faGooglePlusSquare,
	faSignOutAlt,
	faSearch,
	faCheck,
	faPlus,
	faMinus,
	faBarcode,
	faEye,
);

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			userId: null,
			token: null,
		};
		this.notificationDOMRef = React.createRef();
	}

	componentDidMount () {
		if (localStorage.getItem('token') && localStorage.getItem('userId')) {
			this.login(localStorage.getItem('userId'), localStorage.getItem('token'));
		}
	}

	addNotification = ({ title = '', message }) => {
		this.notificationDOMRef.current.addNotification({
			title: 'Awesomeness',
			message: 'Awesome Notifications!',
			type: 'success',
			insert: 'top',
			container: 'bottom-left',
			animationIn: [ 'animated', 'fadeIn' ],
			animationOut: [ 'animated', 'fadeOut' ],
			dismiss: { duration: 2000 },
			dismissable: { click: true },
		});
	};

	login = async (userId, token) => {
		await this.setState({ userId, token });
		localStorage.setItem('userId', userId);
		localStorage.setItem('token', token);
	};

	logout = () => {
		this.setState({ userId: null, token: null });
		localStorage.removeItem('token');
	};

	render () {
		const { userId, token } = this.state;
		const { login, logout, addNotification, notificationDOMRef } = this;
		return (
			<ApolloProvider client={client}>
				<Router>
					<AuthContext.Provider
						value={{
							userId,
							token,
							login,
							logout,
						}}>
						<NotificationsContext.Provider
							value={{
								addNotification,
							}}>
							<ReactNotification ref={notificationDOMRef} />
							<Switch>
								{this.state.token && <Redirect from='/login' to='/profile' />}
								{this.state.token && <Redirect from='/signup' to='/profile' />}
								{!this.state.token && <Redirect from='/confirm' to='/login' />}
								{!this.state.token && <Redirect from='/profile' to='/login' />}
								{!this.state.token && <Redirect from='/main' to='/login' />}
								<Route exact path='/' component={Start} />
								<Route exact path='/login' render={() => <Login signup={false} />} />
								<Route exact path='/signup' render={() => <Login signup={true} />} />
								<Route exact path='/profile' component={Profile} />
								<Route exact path='/main' component={Main} />
								<Route path='*' exact component={NotFound} />
							</Switch>
						</NotificationsContext.Provider>
					</AuthContext.Provider>
				</Router>
			</ApolloProvider>
		);
	}
}
