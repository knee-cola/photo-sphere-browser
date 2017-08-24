import { Map, List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { FETCH_FILES_REQUEST, FETCH_FILES_SUCCESS } from '../actions';

const filesReducer = (files = null, action) => {

	if(action.type === FETCH_FILES_SUCCESS) {
		files = new List(action.payload.map(el => Map(el)));
	}

	return(files);
};

// [react-router-redux] reducer doesn't support Immutable,
// so we need to implement our own
// Info @ https://github.com/gajus/redux-immutable
const pathnameReducer = (pathname = null, action) => {

	if(action.type===LOCATION_CHANGE) {
		pathname = action.payload.pathname.replace(BASE_URL, '/');
	}

	return(pathname);
};

// here we combine reducers via [redux-immutable],
// since the "native" [combinerReducers] function doesn't support Immutable store
// More info at: https://github.com/gajus/redux-immutable
export default combineReducers({
	files: filesReducer,
	pathname: pathnameReducer
});