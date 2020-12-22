/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {connect} from "react-redux"
import Logo from "../../assets/img/halogen/halogen_white.png"
import "./MyModalStyle.scss"

const MyModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

    useEffect(() => {
        if(!props.updatedProfile ){
            setModal(true);
            console.log("hello")
        }
        
    }, [props.updatedProfile]);
  

  return (
    <div>
      
      <Modal isOpen={modal} toggle={toggle} className={className}>
            <div className="my-modal-header">
                <img className="modal-logo" src={Logo} alt="" />
                <h1>Welcome To Halo-Biz</h1>
            </div>
         
        
        <ModalBody className="my-modal-body">
          <p>
            We noticed that your profile is incomplete kindly proceed and
            complete the profile entries by clicking okay. Please note that
            without your complete profile details access to this platform would
            be restrictive!
          </p>

          <ul>
            <li>Profile Picture</li>
            <li>Basic Information</li>
            <li>Contact Information</li>
          </ul>

          <p>
            Please note that without your complete profile details access to
            this platform would be restrictive!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const {  updatedProfile } = authUser;
  return { updatedProfile };
};

export default connect(mapStateToProps )(MyModal);
