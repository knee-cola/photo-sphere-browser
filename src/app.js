// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');
require('./service.ashx');
require('./web.config');
require('./images/readme.txt');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, Switch } from 'react-router';

import NavBar from './components/NavBar';
import FileList from './components/FileList';
import SphereViewer from './components/SphereViewer';
import store, {history} from './store';


ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Route path="/*" component={NavBar} />
				<Switch>
					<Route path="/*.jpg" component={SphereViewer} />
					<Route path="/*" component={FileList} />
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root'));