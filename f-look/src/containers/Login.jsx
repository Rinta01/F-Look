import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '../css/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
	static propTypes = {};

	render() {
		return (
			<div className='login-page'>
				<header>
					<span id='signup'>Sign Up</span>
					{' / '}
					<span id='login'>Log in</span>
				</header>
				<section className='form-container'>
					<form>
						<input name='country' type='text' />
						<input name='tel' type='tel' />
						<input name='password' type='password' />
						<input name='confirmPassword' type='password' />
						<button type='submit'>Submit</button>
					</form>
				</section>
				<footer>
					<span>Sign In Via:</span>
					<div>
						<FontAwesomeIcon className="social-icon" icon={['fab', 'facebook-square']}/>
						<FontAwesomeIcon className="social-icon" icon={['fab', 'google-plus-square']}/>
						<FontAwesomeIcon className="social-icon" icon={['fab', 'vk']}/>
					</div>
				</footer>
			</div>
		);
	}
}
