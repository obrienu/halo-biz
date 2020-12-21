import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';


export default class UpdateProfile extends Component{


    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
      };
    
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };



    render(){
        return(
            <div className="row">

                <div className="col-sm-10 col-lg-7 mx-auto">
                    <RctCollapsibleCard heading="Profile Update">
							<Form>
                                <li className="list-inline-item center">
                                    <Avatar alt="user 1" src={require('Assets/img/user-5.jpg')} className="size-120 rounded-circle border-primary rct-notify" />
                                </li>
								<FormGroup>
									<Label for="Email">Email</Label>
									<Input type="email" name="email" id="Email" placeholder="Email address" />
								</FormGroup>
								<FormGroup>
									<Label for="Password">Password</Label>
									<Input type="password" name="password" id="Password" placeholder="password" />
								</FormGroup>
								<FormGroup>
									<Label for="Select">Select</Label>
									<Input type="select" name="select" id="Select">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="SelectMulti">Select Multiple</Label>
									<Input type="select" name="selectMulti" id="SelectMulti" multiple>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="Text">Text Area</Label>
									<Input type="textarea" name="text" id="Text" />
								</FormGroup>
								<FormGroup>
									<Label for="File">File</Label>
									<Input type="file" name="file" id="File" />
									<FormText color="muted">
										This is some placeholder block-level help text for the above input.
                                        Its a bit lighter and easily wraps to a new line.
                                    </FormText>
								</FormGroup>
								<FormGroup tag="fieldset">
									<legend>Radio Buttons</legend>
									<FormGroup check>
										<Label check>
											<Input type="radio" name="radio1" />{' '}
											Option one is this and that—be sure to include why its great
                                        </Label>
									</FormGroup>
									<FormGroup check>
										<Label check>
											<Input type="radio" name="radio1" />{' '}
											Option two can be something else and selecting it will deselect option one
                                        </Label>
									</FormGroup>
									<FormGroup check disabled>
										<Label check>
											<Input type="radio" name="radio1" disabled />{' '}
											Option three is disabled
                                        </Label>
									</FormGroup>
								</FormGroup>
								<FormGroup check className="mb-20">
									<Label check>
										<Input type="checkbox" />{' '}
										Check me out
                                    </Label>
								</FormGroup>
								<Button color="primary">Submit</Button>
							</Form>
                    </RctCollapsibleCard>
                </div>

            </div>
        )
    }
}