import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { LoginForm, RegForm } from '../../Forms';
import './Login.scss';
import { CodeConfirm } from '../../../components/CodeConfirm';
import { LoginFooter } from '../../../components/LoginFooter';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signup: this.props.signup,
			phone: null,
		};
		this.getNumber = this.getNumber.bind(this);
	}

	render() {
		return (
			<Router>
				<div className='container' onKeyDown={this.handleKeyDown}>
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
							render={() => (
								<LoginForm getNumber={this.getNumber} />
							)}
						/>
						<Route
							exact
							path='/signup'
							render={() => (
								<RegForm getNumber={this.getNumber} />
							)}
						/>
					</Switch>
					{/* Path to phone number confirmation */}
					{this.state.phone && (
						<Route
							exact
							path='/confirm'
							render={() => (
								<CodeConfirm phone={this.state.phone} />
							)}
						/>
					)}
					<LoginFooter signup={this.state.signup} />
				</div>
			</Router>
		);
	}
	handleKeyDown(e) {
		if (e.which === 27) {
			e.target.blur();
		}
	}
	getNumber(num) {
		this.setState({
			phone: num,
		});
	}
}

export default Login;
