import React, { Component } from 'react';
import '../css/Start.scss';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

class Start extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/login' />;
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
	handleClick = () => {
		this.setState({
			redirect: true,
		});
	};
}

export default Start;
