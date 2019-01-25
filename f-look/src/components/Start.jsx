import React from 'react';
import '../css/Start.scss';

const Start = (props) => {
	return (
		<div className='start-page'>
			<div className='logo-container' onClick={props.onClick}>
				<span className='logo'>F-Look</span>
			</div>
		</div>
	);
};

export default Start;
