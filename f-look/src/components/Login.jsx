import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import RegForm from '../containers/RegForm';
import '../css/Login.scss';
import CodeConfirm from './CodeConfirm';
import LoginFooter from './LoginFooter';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signup: false,
			codeSent: false,
			phone: 'no phone :(',
		};
		this.getNumber = this.getNumber.bind(this);
	}

	render() {
		return (
			<Router>
				<div className='login-page' onKeyDown={this.handleKeyDown}>
					<header>
						<Link
							to='/signup'
							id='signup'
							className={this.state.signup ? 'active' : ''}
							onClick={() => {
								this.setState({ signup: true });
							}}>
							Sign Up
						</Link>
						{' / '}
						<Link
							to='/login'
							id='login'
							className={!this.state.signup ? 'active' : ''}
							onClick={() => {
								this.setState({ signup: false });
							}}>
							Log in
						</Link>
					</header>
					<Switch>
						<Route
							exact
							path='/login'
							render={({ history }) => (
								<LoginForm
									getNumber={this.getNumber}
									history={history}
								/>
							)}
						/>
						<Route
							exact
							path='/signup'
							render={({ history }) => (
								<RegForm
									getNumber={this.getNumber}
									history={history}
								/>
							)}
						/>
						<Route
							exact
							path='/confirm'
							render={() => (
								<CodeConfirm phone={this.state.phone} />
							)}
						/>
					</Switch>
					{!this.state.codeSent ? (
						<LoginFooter signup={this.state.signup} />
					) : null}
				</div>
			</Router>
		);
	}
	handleKeyDown(e) {
		if (e.which === 27) {
			e.target.blur();
		}
	}
	async getNumber(history, num) {
		await this.setState({
			phone: num,
		});
		if (history) {
			history.push('/confirm');
		} else {
			console.log('No history object was provided');
		}
	}
}

export default Login;
