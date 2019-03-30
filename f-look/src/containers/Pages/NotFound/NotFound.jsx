import React from 'react';
import './NotFound.scss';
import { NavPanel } from '../../../components/NavPanel'
const NotFound = () => {
	return (
		<>
		<div className='not-found'>
			<main>
				<span>Not Found</span>
			</main>
		</div>
		<NavPanel/>
		</>
	);
};

export default NotFound;
