/**
 * Components Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async routes
import {
	AsyncUIAlertsComponent,

} from 'Components/AsyncComponent/AsyncComponent';

const Components = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Halo-Biz</title>
			<meta name="description" content="Halogen Core Business application" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/users/profile`} />
			<Route path={`${match.url}/alerts`} component={AsyncUIAlertsComponent} />
		</Switch>
	</div>
);

export default Components;
