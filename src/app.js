// we need to require CSS file from JavaScript in order
// for the CSS file be processed by WebPack
require('./app.scss');
require('./service.ashx');
require('./service.php');
require('./web.config');
require('./images/readme.txt');

import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './containers/NavBarContainer';
import FileList from './containers/FileListContainer';
import SphereViewer from './containers/SphereViewerContainer';
import reducers from './reducers';
import { fetchFiles } from './actions';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { Router, Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory';

// this will enable forward & back buttons
const browserHistory = createHistory();

const middleware = applyMiddleware(
		thunkMiddleware, // [thunkMiddleware] lets use dispatch() functions
		routerMiddleware(browserHistory));

const store = createStore(reducers, middleware);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={browserHistory}>
			<div>
				<Route path="/*" component={NavBar} />
				<Switch>
					<Route path="/*.jpg" component={SphereViewer} />
					<Route path="/*" component={FileList} />
				</Switch>
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'));

// getting the pathname from the current URL (stripping the BASE_URL)
const onLocationChange = location => store.dispatch(fetchFiles({payload: { pathname: location.pathname.replace(BASE_URL, '/') }}));

browserHistory.listen(location => onLocationChange(location));

// start loading files right away
onLocationChange(window.location);