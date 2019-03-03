import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Main.scss';
import { NavPanel } from '../../../components/NavPanel';
import { Icon } from '../../../components/Icon';

export default class Main extends Component {
	render() {
		return (
			<div className='main-wrapper'>
				<div className='main-container'>
					<div className='links-wrapper'>
						<NavLink to='/codescan'>
							<section>
								<span>Scan barcode</span>
								<Icon icon='barcode' />
							</section>
						</NavLink>
						<NavLink to='/article'>
							<section>
								<span>Search apparel</span>
								<Icon icon='eye' />
							</section>
						</NavLink>
					</div>
                    {/* into separate component */}
					<section className='search-section'>
						<input type='text' />
						<Icon icon='search' />
					</section>
				</div>
				<NavPanel />
			</div>
		);
	}
}
