import React, { Component } from 'react';
import '../css/Login.scss';
// import UsersQuery from '../graphql/Users';
import LoginForm from '../components/LoginForm';
import LoginFooter from '../components/LoginFooter';
class Login extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	render() {
		return (
			<div className='login-page' onKeyDown={this.handleKeyDown}>
				<header>
					<span id='signup'>Sign Up</span>
					{' / '}
					<span id='login'>Log in</span>
				</header>
				<LoginForm />
				<LoginFooter />
				{/* <UsersQuery /> */}
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
