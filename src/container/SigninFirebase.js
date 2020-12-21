/**
 * Signin Firebase
 */
import "./styles//LoginPageCustomStyles.scss";
import React, { Component } from "react";
import Hidden from "@material-ui/core/Hidden";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";
import { Fab } from "@material-ui/core";
import Logo from "../assets/img/halogen/halogen_white.png";
import HaloBiz from "../assets/img/halogen/HALOBIZ PNG.png";

// app config
import AppConfig from "Constants/AppConfig";

// redux action
import {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter,
} from "Actions";

//Auth File
import Auth from "../Auth/Auth";

const auth = new Auth();

class Signin extends Component {
  state = {
    email: "demo@example.com",
    password: "test#123",
  };

  /**
   * On User Login
   */
  onUserLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.signinUserInFirebase(this.state, this.props.history);
    }
  }

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push("/signup");
  }

  //Auth0 Login
  loginAuth0() {
    auth.login();
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        {loading && <LinearProgress />}
        <div className="login-page">
        <div className="container">

        
          <div className="left-section">
            <Form>
            <div className="logo-container">
                  <img src={Logo} alt="" className="login-logo"/>
            </div>
              <FormGroup className="has-wrapper mb-3">
                <Input
                  type="mail"
                  value={email}
                  name="user-mail"
                  id="user-mail"
                  className="has-input input-lg "
                  placeholder="Enter Email Address"
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
                <span className="has-icon">
                  <i className="ti-email"></i>
                </span>
              </FormGroup>
              <FormGroup className="has-wrapper mb-3">
                <Input
                  value={password}
                  type="Password"
                  name="user-pwd"
                  id="pwd"
                  className="has-input input-lg"
                  placeholder="Password"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <span className="has-icon">
                  <i className="ti-lock"></i>
                </span>
              </FormGroup>
              <FormGroup className="mb-15">
                <Button
                  color="primary"
                  className="btn-block text-white w-100"
                  variant="contained"
                  size="large"
                  onClick={() => this.onUserLogin()}
                >
                  Sign In
                </Button>
              </FormGroup>
            </Form>
            <div className="form-bottom">
            <p className="mb-20">or sign in with G-Suit Account</p>

                <Fab
                  size="small"
                  variant="round"
                  className="btn-google mr-15 mb-20 text-white"
                  onClick={() =>
                    this.props.signinUserWithGoogle(this.props.history)
                  }
                >
  <i className="zmdi zmdi-google"></i>
</Fab>
            </div>
            
          </div>

          <div className="right-section">
              <img className="" src={HaloBiz} alt=""/>
          </div>
        </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter,
})(Signin);
