import React, { Component } from 'react';
import '../css/Start.scss';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import AuthContext from '../containers/AuthContext';

class Start extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	static contextType = AuthContext;

	handleClick = () => {
		this.setState({
			redirect: true,
		});
	};

	render() {
		if (this.context.token && this.state.redirect) {
			return <Redirect push from='/' to='/main' />;
		}
		if (this.state.redirect) {
			return <Redirect push from='/' to='/login' />;
		}
		return (
			<Router>
				<div className='start-page'>
					<div className='logo-container' onClick={this.handleClick}>
						<span className='logo'>F-Look</span>
					</div>
				</div>
			</Router>
		);
	}
}

export default Start;
