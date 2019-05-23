import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { GET_ALL_APPAREL, GET_RECOMMENDED } from '../../../graphql/queries';
import { CustomLoader, StatusContainer } from '../../../components';
// import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import './Clothes.scss';
import Item from './components/Item/Item';

const Clothes = () => {
	const [ itemId, setitemId ] = useState('');
	const handleRecommend = id => {
		setitemId(id);
	};
	return (
		<Query query={GET_ALL_APPAREL}>
			{({ loading, error, data, refetch }) => {
				if (loading) return <CustomLoader {...{ loading, absolute: true }} />;
				if (error) return <StatusContainer {...error} />;
				if (itemId) {
					return (
						<Query query={GET_RECOMMENDED} variables={{ itemId }}>
							{({ loading, error, data, refetch }) => {
								if (loading) return <CustomLoader {...{ loading, absolute: true }} />;
								if (error) return <StatusContainer {...error} />;
								return (
									<div className='apparel-wrapper'>
										<h3>Recommended Items</h3>
										<div className='apparel-container'>
											{data.recommended.map(a => (
												<Item item={a} key={a.id} handleRecommend={handleRecommend} />
											))}
										</div>
									</div>
								);
							}}
						</Query>
					);
				}
				else {
					console.log(data);
					return (
						<div className='apparel-wrapper'>
							<h3>Popular Items</h3>
							<div className='apparel-container'>
								{data.allApparel.map(a => (
									<Item item={a} key={a.id} handleRecommend={handleRecommend} />
								))}
							</div>
						</div>
					);
				}
			}}
		</Query>
	);
};

export default Clothes;
