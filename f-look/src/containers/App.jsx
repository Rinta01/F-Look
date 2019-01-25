import React, { Component } from 'react';
import '../css/App.scss';
import Start from '../components/Start';
import Login from '../containers/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faFacebookSquare,
	faGooglePlusSquare,
	faVk,
} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookSquare, faGooglePlusSquare, faVk);

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
			<div className='App'>
				{this.state.start ? <Start onClick={this.startApp}/> : null}
				{!this.state.start ? <Login /> : null}
			</div>
		);
	}
}

export default App;
