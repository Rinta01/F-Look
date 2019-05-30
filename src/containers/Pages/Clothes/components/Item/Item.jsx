/* eslint-disable no-unused-vars */
import React from 'react';
import t from 'prop-types';
import './Item.scss';
import { Icon, CustomLoader, StatusContainer, SubmitButton } from '../../../../../components';
import { Mutation } from 'react-apollo';
import { ADD_TO_WISHLIST, GET_USER } from '../../../../../graphql/queries';

const propTypes = {
	item: t.object,
};

const Item = ({ item, handleRecommend, userId, favored }) => {
	const { id, name, image, price, source, brand } = item;
	console.log(userId, favored);
	return (
		<Mutation
			mutation={ADD_TO_WISHLIST}
			variables={{ userId, itemId: id }}
			// update={(cache, { data: { addToWishlist } }) => {
			// 	console.log(addToWishlist);
			// 	console.log(cache);
			// 	const { user } = cache.readQuery({ query: GET_USER });
			// 	console.log(user);
			// 	cache.writeQuery({
			// 		query: GET_USER,
			// 		data: { user: { ...user, wishlist: user.wishlist.concat(addToWishlist) } },
			// 	});
			// }}
			onCompleted={({ addToWishlist }) => {
				console.log(addToWishlist);
				console.log('Added to wishlist!');
			}}
			onError={err => {
				console.log({ ...err });
				// notification.addNotification({ message: err.networkErrors[0].message });
			}}>
			{(addToWishlist, { loading, error }) => (
				<div className='cloth-item' data-itemid={id}>
					<a href={source} target='_blank' rel='noopener noreferrer'>
						<img className='item-image' src={image} alt='' />
					</a>
					<div className='upper-panel'>
						<a href={source} target='_blank' rel='noopener noreferrer'>
							<Icon icon='link' title='See source' />
						</a>
						<Icon icon='hand-holding-heart' title='See recommended' onClick={() => handleRecommend(id)} />
						<Icon icon='star' title='Add to wishlist' onClick={addToWishlist} favored={favored} />
					</div>
					<span className='item-name'>{name}</span>
					<span className='price-tag'>{price} rub</span>
					{loading && <CustomLoader loading={loading} />}
					{error && <StatusContainer error={error} graphql />}
				</div>
			)}
		</Mutation>
	);
};

Item.propTypes = propTypes;

export default Item;
