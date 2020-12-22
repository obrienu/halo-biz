/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncUserProfileComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
    <div className="content-wrapper">
        
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
            <Route path={`${match.url}/profile`} component={AsyncUserProfileComponent} />
        </Switch>
    </div>
);

export default Forms;
