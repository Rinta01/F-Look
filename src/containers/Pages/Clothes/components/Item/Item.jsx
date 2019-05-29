/* eslint-disable no-unused-vars */
import React from 'react';
import t from 'prop-types';
import './Item.scss';
import { Icon } from '../../../../../components';

const propTypes = {
	item: t.object,
};

const Item = ({ item, handleRecommend }) => {
	const { id, name, image, price, source, brand } = item;
	return (
		<div className='cloth-item' data-itemid={id}>
			<a href={source} target='_blank' rel='noopener noreferrer'>
				<img className='item-image' src={image} alt='' />
			</a>
			<div className='upper-panel'>
				<a href={source} target='_blank' rel='noopener noreferrer'>
					<Icon icon='link' title='See source' />
				</a>
				<Icon icon='hand-holding-heart' title='See recommended' onClick={() => handleRecommend(id)} />
				<Icon icon='star' title='Add to wishlist' />
			</div>
			<span className='item-name'>{name}</span>
			<span className='price-tag'>{price} rub</span>
		</div>
	);
};

Item.propTypes = propTypes;

export default Item;
