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
			signup: this.props.signup,
			phone: null,
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
						{this.state.phone && (
							<Route
								exact
								path='/confirm'
								render={() => (
									<CodeConfirm phone={this.state.phone} />
								)}
							/>
						)}
					</Switch>
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
