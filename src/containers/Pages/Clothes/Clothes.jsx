import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_APPAREL, GET_RECOMMENDED, GET_USER } from '../../../graphql/queries';
import { CustomLoader, StatusContainer } from '../../../components';
import './Clothes.scss';
import Item from './components/Item/Item';
import t from 'prop-types';
import AuthContext from '../../../context/AuthContext';

const ApparelItems = ({ userId, dataSet, userWishlist, handleRecommend }) => {
	return dataSet.map(a => {
		const favored = userWishlist.some(s => s.id === a.id);
		return <Item item={a} key={a.id} {...{ userId, handleRecommend }} favored={favored ? 'favored' : ''} />;
	});
};

class Clothes extends Component {
	constructor (props) {
		super(props);
		this.state = {
			itemId: '',
		};
		this.container = React.createRef();
	}
	static contextType = AuthContext;
	static propTypes = {
		wishlist: t.bool,
	};
	static defaultProps = {
		wishlist: false,
	};

	setItemId = itemId => {
		this.setState({ itemId });
	};
	handleRecommend = id => {
		this.setItemId(id);
	};
	handleArrowClick = w => {
		const node = this.container.current;
		if (node) {
			if (w === 'right') {
				node.scrollLeft += 300;
			}
			if (w === 'left') {
				node.scrollLeft -= 300;
			}
		}
	};
	render () {
		const { container, handleArrowClick, handleRecommend } = this;
		const { itemId } = this.state;
		const { wishlist } = this.props;
		const { userId } = this.context;
		if (userId) {
			return (
				<Query query={GET_USER} variables={{ userId: this.context.userId }}>
					{({ loading, error, data: { findUser }, refetch }) => {
						if (loading) return <CustomLoader {...{ loading }} />;
						if (error) return <StatusContainer {...error} />;
						if (findUser) {
							return (
								<Query query={itemId ? GET_RECOMMENDED : GET_ALL_APPAREL} variables={itemId ? { itemId } : null}>
									{({ loading, error, data, refetch }) => {
										if (loading) return <CustomLoader {...{ loading }} />;
										if (error) return <StatusContainer {...error} />;
										else {
											const userWishlist = findUser.wishlist;
											const dataSet = wishlist ? userWishlist : itemId ? data.recommended : data.allApparel;
											return (
												<div className='apparel-wrapper'>
													<h3>{itemId ? 'Recommended' : 'Popular'} Items</h3>
													<div className='apparel-container' ref={container}>
														<div className='arrows-scroll' onClick={() => handleArrowClick('left')}>
															&#10094;
														</div>
														<ApparelItems {...{ userId, handleRecommend, dataSet, userWishlist }} />
														<div className='arrows-scroll' onClick={() => handleArrowClick('right')}>
															&#10095;
														</div>
													</div>
												</div>
											);
										}
									}}
								</Query>
							);
						}
						else return null;
					}}
				</Query>
			);
		}
		else return null;
	}
}

export default Clothes;
