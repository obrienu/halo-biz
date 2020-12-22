/**
 * Profile Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  Input,
  Form,
  Label,
  Col,
  FormText,
  Row,
  Table,
  ButtonGroup,
} from "reactstrap";
import Button from "../../../../components/CustomResables/Button/button";
import { LOGIN_USER } from "Actions/types";
import { NotificationManager } from "react-notifications";
import { updateUserProfile } from "../../../../api/index";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

// intlmessages

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileNumber: "",
      dateOfBirth: "",
      imageUrl: "",
      dateOfBirth: "",
      jobTitle: "",
      maritalStatus: "",
      address: "",
      error: "",
      showinfoForm: false,
      showContactForm: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onUpdateProfile = this.onUpdateProfile.bind(this);
  }

  componentDidMount(){
    const { imageUrl, maritalStatus, dateOfBirth, gender, email, lastName, firstName,
      jobTitle, mobileNumber, address
    } = this.props.userInfo;
    this.setState({
      ...this.state,
      lastName,
      firstName,
      email,
      dateOfBirth,
      maritalStatus: maritalStatus ? maritalStatus : "",
      gender: gender ? gender : "",
      jobTitle: jobTitle ? jobTitle : "",
      mobileNumber: mobileNumber ? mobileNumber : "",
      imageUrl: imageUrl ? imageUrl : "",
      address: address ? address : "",

    })
  }


  

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  
  /**
   * On Update Profile
   */
  async onUpdateProfile(e) {
    e.preventDefault();

    const { imageUrl, maritalStatus, dateOfBirth, gender, email, lastName, firstName,
            jobTitle, mobileNumber, address
          } = this.state;
    const updatedProfile = {
            imageUrl, maritalStatus, dateOfBirth, gender, email, lastName, firstName,
            jobTitle, mobileNumber, address
    };

    try{
      let isUpdated = await this.props.updateUserProfile(updatedProfile);
      
    if(isUpdated){
      this.setState({
        ...this.state,
        showinfoForm: false,
        showContactForm: false,
      })
      NotificationManager.success("Your profile has been updated")
    }else{
      NotificationManager.error("Error please try again")
    }
    }catch(err){
      NotificationManager.success("Error please try again")
    }

    
  }

  toggleForm(type) {
    if (type === "contact") {
      this.setState({
        ...this.state,
        showContactForm: !this.state.showContactForm,
      });
    } else {
      this.setState({
        ...this.state,
        showInfoForm: !this.state.showInfoForm,
      });
    }
  }

  render() {
    const {userInfo} = this.props;
    const BasicInformation = (
      <div className="basic-info">
        <Table borderless>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>{userInfo.firstName + " " + userInfo.lastName}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{this.state.gender}</td>
            </tr>
            <tr>
              <td>Birth Date</td>
              <td>{userInfo.dateOfBirth == "01/01/0001" ? "" : userInfo.dateOfBirth}</td>
            </tr>
            <tr>
              <td>Marital Status</td>
              <td>{userInfo.maritalStatus}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
    const ContactInformation = (
      <div className="basic-info">
        <Table borderless>
          <tbody>
            <tr>
              <td >Email</td>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td>{userInfo.mobileNumber}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                {userInfo.address}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );

    const BasicForn = (
      <Form onSubmit={(e) => this.onUpdateProfile(e)}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
              required
                type="text"
                name="firstName"
                id="exampleEmail"
                placeholder="FirstName"
                readOnly
                onChange={(e) => this.handleChange(e)}
                value = {userInfo.firstName}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                name="lastName"
                id="examplePassword"
                placeholder="LastName"
                readOnly
                value = {userInfo.lastName}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
                required
                type="text"
                name="jobTitle"
                id="jobTitle"
                placeholder="Job Title"
                onChange={(e) => this.handleChange(e)}
                value = {this.state.jobTitle}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup row>
                <Input onChange={(e) => this.handleChange(e)} required type="select" name="gender" id="gender" value = {this.state.Gender}>
                  <option value="">------Gender--------</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
              
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
              onChange={(e) => this.handleChange(e)}
              required
                type="date"
                name="dateOfBirth"
                id="birthdate"
                placeholder="1990-02-28"
                value = {this.state.dateOfBirth}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup >
                <Input onChange={(e) => this.handleChange(e)} required type="select" name="maritalStatus" value={this.state.maritalStatus}>
                  <option value="">------Marital Status--------</option>
                  <option value="Married">Married</option>
                  <option value="Not Married">Not Married</option>
                </Input>
            </FormGroup>
          </Col>
        </Row>
        <div className="basic-into-footer">
            <Button
            style={{color: "white"}}
            onClick={() => {}}
            size="lg" active>Save</Button>
         </div>
      </Form>
    );

    const ContactForn = (
      <Form onSubmit={e => this.onUpdateProfile(e)}>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Input
              required
              readOnly
              onChange={(e) => this.handleChange(e)} 
              value = {userInfo.email}
               type="email" name="email" id="email" placeholder="Email" />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
                type="tel"
                name="mobileNumber"
                id="mobile"
                placeholder="Mobile Number"
                onChange={(e) => this.handleChange(e)}
                value={this.state.mobileNumber}
              />
            </FormGroup>
          </Col>
          <Col sm={12}>
            <FormGroup row>
              <Label htmlFor="exampleText" sm={2}>
                Address
              </Label>
              <Col sm={10}>
                <Input
                onChange={(e) => this.handleChange(e)}
                value ={this.state.address}
                 type="textarea" name="address" id="exampleText" />
              </Col>
            </FormGroup>
          </Col>
          
          
         
        </Row>
        <div className="basic-into-footer">
            <Button
            style={{color: "white"}}
              onClick={() => {}}
             >Save</Button>
         </div>
      </Form>
    );

    return (
      <div className="my-profile-wrapper">
        <div className="basic-information card">
          <div className="basic-info-header card-header">
            <h5 className="header">Basic Information</h5>
            <span className="edit-icon" onClick={() => this.toggleForm("")}>
            {this.state.showInfoForm ? <AiOutlineClose/> :
              <AiFillEdit />}
            </span>
          </div>
          <div className="basic-info-body">
            {this.state.showInfoForm ? BasicForn : BasicInformation}
          </div>
        </div>

        <div className="basic-information card">
          <div className="basic-info-header card-header">
            <h5 className="header">Contact Information</h5>
            <span
              className="edit-icon"
              onClick={() => this.toggleForm("contact")}
            >
            {this.state.showContactForm ? <AiOutlineClose/> :
              <AiFillEdit />}
            </span>
          </div>
          <div className="basic-info-body">
            {this.state.showContactForm ? ContactForn : ContactInformation}
          </div>

        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const userInfo = authUser["user-info"];
  return { userInfo };
};

const mapDIspatchToProps = (dispatch) => ({
  updateUserProfile: (body) => dispatch(updateUserProfile(body)),
});

export default withRouter(
  connect(mapStateToProps, mapDIspatchToProps)(Profile)
);
