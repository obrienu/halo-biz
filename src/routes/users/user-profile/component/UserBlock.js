/**
 * User Block
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button  from "../../../../components/CustomResables/Button/button"
import { NotificationManager } from 'react-notifications';
import axios from "axios";
import {storage} from "../../../../firebase/index"
import { updateUserProfile} from "Api"
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  UPDATE_USER_CREDENTIALS
} from 'Actions/types';


class UserBlock extends Component {
    constructor(props){
        super(props)

        this.state = {
            imageUrl : "",
            image: ""
        }

        this.putStorageItem = this.putStorageItem.bind(this);
        this.handlefile = this.handlefile.bind(this);
        this.checkFileSize = this.checkFileSize.bind(this);
        this.checkMimeType = this.checkMimeType.bind(this);
        this.updloadImage = this.updloadImage.bind(this);
    }

      handlefile = (event) => {
        const { files } = event.target;
        if (this.checkMimeType(event) && this.checkFileSize(event)) {
           this.updloadImage(files[0]);
        }
      };
    
      
    
      checkMimeType = (event) => {
        //getting file object
        let files = event.target.files[0];
    
        //define message container
        let err = "";
        // list allow mime type
        const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        // loop access array
        if (!files) {
          this.setState({
            error: "Please select an file",
          });
          return false;
        }
        // compare file type find doesn't matach
        if (types.every((type) => files.type !== type)) {
          // create error message and assign to container
          err += files.type + " is not a supported format";
          event.target.value = null; // discard selected file
          this.setState({
            error: err,
          });
          NotificationManager.error(err);
          return false;
        }
        return true;
      };
    
      checkFileSize = (event) => {
        let files = event.target.files[0];
        if (!files) return true;
        let size = 400000;
        let err = "";
        if (files.size > size) {
          err += files.type + " is too large, please pick a smaller file";
          event.target.value = null;
          this.setState({
            error: err,
          });
          NotificationManager.error(err);
          return false;
        }
        return true;
      };
    

    putStorageItem = async (item) => {
        // the return value will be a Promise
        const name = Date.now() + "_" + item.name;
        NotificationManager.info("Uploading Image....")
        try {
        const snapshot = await storage
          .ref(`images/${name}`)
          .put(item);
        return storage.ref("images").child(name).getDownloadURL();
      } catch (error) {
        NotificationManager.error("Failed to add profile image");
        return null;
      }
      };

      async updloadImage(image){
        const userInfo = this.props.userInfo;
         let imageUrl =  await this.putStorageItem(image);
         if(imageUrl == null){
             return;
         }
          let data = {
              ...userInfo,
              imageUrl
          }
          try{
            let isUpdated = await this.props.updateUserProfile(data);
            if(isUpdated){
              NotificationManager.success("Profile Image Uploaded")
            }
          }catch(error){
            NotificationManager.error(error.message)
          }
        
      
      }


    
    render() {
        const {userInfo} = this.props;
        return (
            <div className="user-block">
            {this.props.loading && <LinearProgress />}
            <div className="user-avatar">
                <img src={this.props.userInfo.imageUrl || require('Assets/avatars/profile.gif')} alt="profile banner" className="img-fluid" width="100" height="100" />
            </div>
                <div className="user-details">
                    <span className="user-name"> {userInfo.firstName + " " + userInfo.lastName}</span>
                    <span className="user-job-title"> {userInfo.jobTitle || "Job Title"} </span>
                    <div>
                        <input type="file" name="file" id="file" className="inputfile" onChange={(event) => this.handlefile(event)} />
                        <label htmlFor="file">Update Picture</label>
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

const mapDispatchToProps = dispatch => ({
  updateUserProfile: (body) => dispatch(updateUserProfile(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);
