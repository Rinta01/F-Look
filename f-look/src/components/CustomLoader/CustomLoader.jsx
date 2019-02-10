import React from 'react';
import Loader from 'react-loader-spinner';
import './CustomLoader.scss';

const CustomLoader = ({ loading }) => {
	if (loading) {
		return (
			<div className='loader'>
				<Loader
					type='Bars'
					color='#b97fff'
					width='40'
					height='50'
				/>
			</div>
		);
	} else return null;
};

export default CustomLoader;
