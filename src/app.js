// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');
require('./service.ashx');
require('./web.config');
require('./images/readme.txt');

import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import FileList from './components/FileList';
import SphereViewer from './components/SphereViewer';

import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history'

// this will enable forward & back buttons
const browserHistory = createBrowserHistory();

ReactDOM.render(
	<Router history={browserHistory}>
		<div>
			<Route path="/*" component={NavBar} />
			<Switch>
				<Route path="/*.jpg" component={SphereViewer} />
				<Route path="/*" component={FileList} />
			</Switch>
		</div>
	</Router>,
	document.getElementById('root'));