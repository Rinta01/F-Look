import React, { Component } from 'react';
import '../css/Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Users from '../graphql/Users';

class Login extends Component {
	render() {
		return (
			<div className='login-page' onKeyDown={(e)=>{
				if(e.which===27){
					e.target.blur();
				}
			}}>
				<header>
					<span id='signup'>Sign Up</span>
					{' / '}
					<span id='login'>Log in</span>
				</header>
				<section className='form-container'>
					<form>
						<input name='country' type='text' placeholder="Country"/>
						<input name='tel' type='tel' placeholder="Phone number"/>
						<input name='password' type='password' placeholder="Password"/>
						<input name='confirmPassword' type='password' placeholder="Confirm Password"/>
						<button type='submit'>Submit</button>
					</form>
				</section>
				<footer>
					<span>Sign In Via:</span>
					<div>
						<FontAwesomeIcon
							className='social-icon'
							icon={['fab', 'facebook-square']}
						/>
						<FontAwesomeIcon
							className='social-icon'
							icon={['fab', 'google-plus-square']}
						/>
						<FontAwesomeIcon
							className='social-icon'
							icon={['fab', 'vk']}
						/>
					</div>
				</footer>
				{/* <Users /> */}
			</div>
		);
	}
}

export default Login;
