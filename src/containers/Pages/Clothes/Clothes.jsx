import React, { Component, useState } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_APPAREL, GET_RECOMMENDED } from '../../../graphql/queries';
import { CustomLoader, StatusContainer } from '../../../components';
import './Clothes.scss';
import Item from './components/Item/Item';

class Clothes extends Component {
	constructor (props) {
		super(props);
		this.state = {
			itemId: '',
		};
		this.container = React.createRef();
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
		const { itemId } = this.state;
		if (container.current) console.log(container.current.scrollLeft);
		return (
			<Query query={itemId ? GET_RECOMMENDED : GET_ALL_APPAREL} variables={itemId ? { itemId } : null}>
				{({ loading, error, data, refetch }) => {
					const dataSet = itemId ? data.recommended : data.allApparel;
					if (loading) return <CustomLoader {...{ loading }} />;
					if (error) return <StatusContainer {...error} />;
					console.log(container);
					return (
						<div className='apparel-wrapper'>
							<h3>{itemId ? 'Recommended' : 'Popular'} Items</h3>
							<div className='apparel-container' ref={container}>
								<div className='arrows-scroll' onClick={() => handleArrowClick('left')}>
									&#10094;
								</div>
								{dataSet.map(a => <Item item={a} key={a.id} handleRecommend={handleRecommend} />)}
								<div className='arrows-scroll' onClick={() => handleArrowClick('right')}>
									&#10095;
								</div>
							</div>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default Clothes;
