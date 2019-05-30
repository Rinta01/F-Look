/* eslint-disable no-unused-vars */
import React from 'react';
import t from 'prop-types';
import './Item.scss';
import { Icon, CustomLoader, StatusContainer, SubmitButton } from '../../../../../components';
import { Mutation } from 'react-apollo';
import { ADD_TO_WISHLIST, GET_USER } from '../../../../../graphql/queries';

const propTypes = {
	item: t.object,
	favored: t.string,
};

const Item = ({ item, handleRecommend, userId, favored }) => {
	const { id, name, image, price, source, brand } = item;
	return (
		<Mutation
			mutation={ADD_TO_WISHLIST}
			variables={{ userId, itemId: id }}
			update={async (cache, { data: { addToWishlist } }) => {
				if (addToWishlist) {
					const { item, status } = addToWishlist;
					const { findUser: user } = cache.readQuery({ query: GET_USER, variables: { userId } });
					let updatedWishlist = user.wishlist;
					if (status === 'ok') {
						updatedWishlist = [ ...user.wishlist, item ];
					}
					else if (status === 'del') {
						updatedWishlist = user.wishlist.filter(i => i.id !== item.id);
					}
					await cache.writeQuery({
						query: GET_USER,
						data: { findUser: { ...user, wishlist: updatedWishlist } },
					});
				}
			}}
			onCompleted={({ addToWishlist }) => {
				console.log(addToWishlist);
				console.log('Wishlist updated!');
			}}
			onError={err => {
				console.log({ ...err });
				console.log('Wishlist not updated!');
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
						<Icon icon='star' title='Add to wishlist' onClick={addToWishlist} {...{ favored }} />
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
