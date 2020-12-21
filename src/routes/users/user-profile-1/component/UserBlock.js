/**
 * User Block
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';

class UserBlock extends Component {
    render() {
        const {userInfo} = this.props;
        return (
            <div className="profile-top mb-20">
                <img src={require('Assets/img/profile-bg.jpg')} alt="profile banner" className="img-fluid" width="1920" height="345" />
                <div className="profile-content">
                    <div className="media">
                        <img src={userInfo.imageUrl || require('Assets/img/halogen/shola.jpg')} alt="user profile" className="rounded-circle mr-30 bordered" width="140" height="140" />
                        <div className="media-body pt-25">
                            <div className="mb-20">
                                <h2>{userInfo.firstName + " " + userInfo.lastName}</h2>
                                <p>{userInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    const { loading } = authUser;
    const  userInfo = authUser["user-info"];
    return { userInfo, loading };
  };

export default connect(mapStateToProps)(UserBlock);
