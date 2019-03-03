import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavPanel.scss';

const NavPanel = () => {
	return (
		<nav className='nav-panel'>
			<ul>
				<li>
					<NavLink exact to='/main'>
						Main
					</NavLink>
				</li>
				<li>
					<NavLink to='/wishlist'>Wishlist</NavLink>
				</li>
				<li>
					<NavLink exact to='/profile'>
						Account
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavPanel;
