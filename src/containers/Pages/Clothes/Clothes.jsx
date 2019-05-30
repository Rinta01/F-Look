import React, { Component } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { GET_ALL_APPAREL, GET_RECOMMENDED, GET_USER } from '../../../graphql/queries';
import { CustomLoader, StatusContainer } from '../../../components';
import './Clothes.scss';
import Item from './components/Item/Item';
import t from 'prop-types';
import AuthContext from '../../../context/AuthContext';

class Clothes extends Component {
	constructor (props) {
		super(props);
		this.state = {
			itemId: '',
			wishlist: false,
		};
		this.container = React.createRef();
	}
	static contextType = AuthContext;
	static defaultProps = {
		wishlist: false,
	};

	static getDerivedStateFromProps (props, state) {
		return { ...state, wishlist: props.wishlist };
	}

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
		const { itemId, wishlist } = this.state;
		const { userId } = this.context;
		if (wishlist) {
			return (
				<Query query={GET_USER} variables={{ userId: this.context.userId }}>
					{({ loading, error, data, refetch }) => {
						if (loading) return <CustomLoader {...{ loading }} />;
						if (error) return <StatusContainer {...error} />;
						else {
							console.log(data);
							const dataSet = data.findUser.wishlist;
							const favored = dataSet.find(a => a.id !== itemId);
							console.log(dataSet, favored);
							return (
								<div className='apparel-wrapper'>
									<h3>Your Wishlist</h3>
									<div className='apparel-container' ref={container}>
										<div className='arrows-scroll' onClick={() => handleArrowClick('left')}>
											&#10094;
										</div>
										{dataSet && dataSet.map(a => <Item item={a} key={a.id} {...{ userId, handleRecommend, favored }} />)}
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
		return (
			<ApolloConsumer>
				{client => (
					<Query query={itemId ? GET_RECOMMENDED : GET_ALL_APPAREL} variables={itemId ? { itemId } : null}>
						{({ loading, error, data, refetch }) => {
							const dataSet = itemId ? data.recommended : data.allApparel;
							if (loading) return <CustomLoader {...{ loading }} />;
							if (error) return <StatusContainer {...error} />;
							else {
								// const { user } = client.readQuery({ query: GET_USER, variables: { userId } });
								// console.log(user);
								// const favored = user.wishlist.find(a => a.id !== itemId);
								return (
									<div className='apparel-wrapper'>
										<h3>{itemId ? 'Recommended' : 'Popular'} Items</h3>
										<div className='apparel-container' ref={container}>
											<div className='arrows-scroll' onClick={() => handleArrowClick('left')}>
												&#10094;
											</div>
											{dataSet.map(a => <Item item={a} key={a.id} {...{ userId, handleRecommend }} />)}
											<div className='arrows-scroll' onClick={() => handleArrowClick('right')}>
												&#10095;
											</div>
										</div>
									</div>
								);
							}
						}}
					</Query>
				)}
			</ApolloConsumer>
		);
	}
}

export default Clothes;
