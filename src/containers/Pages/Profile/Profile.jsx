import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CustomLoader, StatusContainer, Icon } from '../../../components';
import AuthContext from '../../../context/AuthContext';
import { GET_USER } from '../../../graphql/queries';
import { ProfileForm } from '../../Forms';
import './Profile.scss';

export default class Profile extends Component {
	static contextType = AuthContext;

	render () {
		return (
			<div className='profile-wrapper'>
				<div className='profile-container'>
					<header className='profile-header'>
						<div>
							<h2>Profile</h2>
							<Icon className='social-icon' icon={'sign-out-alt'} onClick={this.context.logout} />
						</div>
						<h4 className='active'>Please fill out your info</h4>
					</header>
					<Query query={GET_USER} variables={{ userId: this.context.userId }}>
						{({ loading, error, data, refetch }) => {
							if (loading) return <CustomLoader loading={loading} />;
							if (error) return <StatusContainer error={error} />;
							else {
								console.log(data);
								return <ProfileForm {...data.findUser} refetch={refetch} />;
							}
						}}
					</Query>
				</div>
			</div>
		);
	}
}
