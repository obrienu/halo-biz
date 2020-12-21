/**
 * Signin Firebase
 */
import "../styles/LoginPageCustomStyles.scss";
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
import HaloBizImage from "../assets/img/halogen/HALOBIZ PNG.png";

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
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img
                        src={AppConfig.appGoldLogo}
                        alt="session-logo"
                        className="img-fluid"
                        width="100"
                        height="100"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <Hidden only={["xs"]}>
                  <div className=" col-md-7 col-lg-8">
                    <img
                      src={HaloBizImage}
                      alt="session-slider"
                      className=""
                      width="100%"
                      height="480"
                    />
                  </div>
                </Hidden>

                <div className="col-sm-8 col-md-5 col-lg-4">
                  <div className="session-body text-center my-form-padding">
                    <div className="session-head mb-30">
                      <img
                        src={AppConfig.appLogo}
                        alt="session-logo"
                        className="img-fluid"
                        width="100"
                        height="100"
                      />
                    </div>
                    <Form>
                      <FormGroup className="has-wrapper">
                        <Input
                          type="mail"
                          value={email}
                          name="user-mail"
                          id="user-mail"
                          className="has-input input-lg"
                          placeholder="Enter Email Address"
                          onChange={(event) =>
                            this.setState({ email: event.target.value })
                          }
                        />
                        <span className="has-icon">
                          <i className="ti-email"></i>
                        </span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
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
              </div>
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
