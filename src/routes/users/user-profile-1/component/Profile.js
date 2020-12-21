/**
 * Profile Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import {
  FormGroup,
  Input,
  Form,
  Label,
  Col,
  FormText,
} from "reactstrap";
import {
   LOGIN_USER,
} from 'Actions/types';
import Button from "@material-ui/core/Button";
import {storage} from '../../../../firebase/index'
import { NotificationManager } from "react-notifications";
import { updateUserProfile} from "../../../../api/index"

// intlmessages
import IntlMessages from "Util/IntlMessages";

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mobileNumber: "",
      dateOfBirth: "",
      image: "",
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkFileSize = this.checkFileSize.bind(this);
    this.putStorageItem = this.putStorageItem.bind(this);
    this.checkMimeType = this.checkMimeType.bind(this);
  }

  handleChange = ({ target }) => {
   const { name, value } = target;
   this.setState({
     [name]: value,
     error: ""
   });
 };

 handlefile = event => {
   const { files } = event.target;
   if (this.checkMimeType(event) && this.checkFileSize(event)) {
     this.setState({
       image: files[0],
       error: ""
     });
   }
 };

 putStorageItem = (item) => {
   // the return value will be a Promise
   const name = Date.now() + "_" + item.name;
   return storage
     .ref(`images/${name}`)
     .put(item)

     .then(snapshot => {
       return storage
         .ref("images")
         .child(name)
         .getDownloadURL();
     })
     .catch(error =>{
      NotificationManager.error("Failed to add profile image")
      this.setState({
        error: "Failed to add file"
      })
     }
     );
 };

  checkMimeType = event => {
   //getting file object
   let files = event.target.files[0];

   //define message container
   let err = "";
   // list allow mime type
   const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
   // loop access array
   if (!files) {
     this.setState({
       error: "Please select an file"
     });
     return false;
   }
   // compare file type find doesn't matach
   if (types.every(type => files.type !== type)) {
     // create error message and assign to container
     err += files.type + " is not a supported format";
     event.target.value = null; // discard selected file
     this.setState({
       error: err
     });
     NotificationManager.error(err);
     return false;
   }
   return true;
 };

 checkFileSize = event => {
   let files = event.target.files[0];
   if (!files) return true;
   let size = 400000;
   let err = "";
   if (files.size > size) {
     err += files.type + " is too large, please pick a smaller file";
     event.target.value = null;
     this.setState({
       error: err
     });
     NotificationManager.error(err);
     return false;
   }
   return true;
 };

  /**
   * On Update Profile
   */
  async onUpdateProfile() {

   for(const key in this.state){
      if(key !== "error" && key !== "image" && this.state[key].trim() === ""){
         NotificationManager.error(key + " cannot be empty");
         return;
      }
   }

   let imageUrl = await this.putStorageItem(this.state.image)
     const {age, ...otherDetails} = this.props.userInfo
   const updatedProfile = {
      ...otherDetails,
      imageUrl,
      dateOfBirth : this.state.dateOfBirth,
      mobileNumber: this.state.mobileNumber
   }



   let isUpdated = this.props.updateUserProfile(updatedProfile)
   console.log(isUpdated);
   if(isUpdated){
      this.setState({
         mobileNumber: "",
         dateOfBirth: "",
         image: "",
         error: ""
      })
      this.props.history.push('/');
   }
}
  

  render() {
    const { userInfo } = this.props;
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form >
          <FormGroup row>
            <Label for="firstName" sm={3}>
              <IntlMessages id="components.firstName" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                disabled
                value={userInfo.firstName}
                name="firstName"
                id="firstName"
                className="input-lg"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lastName" sm={3}>
              <IntlMessages id="components.lastName" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="lastName"
                disabled
                id="lastName"
                className="input-lg"
                value={userInfo.lastName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="dateOfBirth" sm={3}>
              Birth Date
            </Label>
            <Col sm={9}>
              <Input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="input-lg"
                value={this.state.dateOfBirth}
                onChange={event => this.handleChange(event)}
                required
              />
            </Col>
          </FormGroup>
         
          <FormGroup row>
            <Label for="mobileNumber" sm={3}>
              <IntlMessages id="components.phoneNo" />
            </Label>
            <Col sm={9}>
              <Input
                type="tel"
                name="mobileNumber"
                id="mobileNumber"
                className="input-lg"
                onChange={event => this.handleChange(event)}
                value={this.state.mobileNumber}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="File-1" sm={3}>
              Profile Photo
            </Label>
            <Col sm={9}>
              <Input type="file" required name="image" id="File-1" onChange = {event => this.handlefile(event)} />
              <FormText color="muted">
                Profile photo should be a passport photograph with white background not exceeding
                400kb and with a dimension not exceeding 400px by 400px
              </FormText>
            </Col>
          </FormGroup>
        </Form>
        <hr />
        <Button
          variant="contained"
          color="primary"
          className="text-white"
          onClick={() => this.onUpdateProfile()}
        >
          <IntlMessages id="widgets.updateProfile" />
        </Button>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const userInfo = authUser["user-info"];
  return { userInfo };
};


const mapDIspatchToProps = dispatch => ({
   updateUserProfile: (body) => dispatch(updateUserProfile(body))
 });

export default withRouter(connect(mapStateToProps, mapDIspatchToProps)(Profile));
