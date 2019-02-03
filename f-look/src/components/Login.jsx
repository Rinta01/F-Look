import React, { Component } from 'react';
import LoginForm from '../containers/LoginForm';
import RegForm from '../containers/RegForm';
import '../css/Login.scss';
import LoginFooter from './LoginFooter';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signup: false,
		};
	}

	render() {
		return (
			<div className='login-page' onKeyDown={this.handleKeyDown}>
				<header>
					<span
						id='signup'
						className={this.state.signup ? 'active' : ''}
						onClick={() => {
							this.setState({ signup: true });
						}}>
						Sign Up
					</span>
					{' / '}
					<span
						id='login'
						className={!this.state.signup ? 'active' : ''}
						onClick={() => {
							this.setState({ signup: false });
						}}>
						Log in
					</span>
				</header>
				{this.state.signup ? <RegForm /> : <LoginForm />}
				<LoginFooter signup={this.state.signup} />
			</div>
		);
	}
	handleKeyDown(e) {
		if (e.which === 27) {
			e.target.blur();
		}
	}
}

export default Login;
