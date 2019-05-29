import React from 'react';
import Loader from 'react-loader-spinner';
import t from 'prop-types';
import './CustomLoader.scss';

const propTypes = {
	loading: t.bool,
	absolute: t.bool,
};

const CustomLoader = ({ loading, absolute = true }) => {
	if (loading) {
		return (
			<div className={`loader ${absolute ? 'absolute' : ''}`}>
				<Loader type='Bars' color='#b97fff' width='40' height='50' />
			</div>
		);
	}
	else return null;
};

CustomLoader.propTypes = propTypes;

export default CustomLoader;
