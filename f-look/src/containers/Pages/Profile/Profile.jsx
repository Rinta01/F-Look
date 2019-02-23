import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_USER } from '../../../graphql/queries';
import AuthContext from '../../../context/AuthContext';
import StatusContainer from '../../../components/StatusContainer/StatusContainer';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import './Profile.scss';
import Icon from '../../../components/Icon/Icon';
import ProfileForm from '../../Forms/ProfileForm';

export default class Profile extends Component {
	static contextType = AuthContext;

	render() {
		return (
			<div className='profile-wrapper'>
				<div className='profile-container'>
					<header>
						<div>
							<h2>Profile</h2>
							<Icon
								className='social-icon'
								icon={'sign-out-alt'}
								onClick={this.context.logout}
							/>
						</div>
						<h4 className='active'>Please fill out your info</h4>
					</header>
					<Query
						query={GET_USER}
						variables={{ userId: this.context.userId }}>
						{({ loading, error, data }) => {
							if (loading)
								return <CustomLoader loading={loading} />;
							if (error) return <StatusContainer error={error} />;
							else {
								console.log(data);
								return <ProfileForm {...data.findUser} />;
							}
						}}
					</Query>
				</div>
			</div>
		);
	}
}
