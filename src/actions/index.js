import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux'

const FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST';
const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';

const requestFiles = (pathname) => ({
	type: FETCH_FILES_REQUEST,
	payload: {
		pathname: pathname
	}
});

// this is an async operations - this is a THUNK Action Creator (=function which returns a function)
const fetchFiles = (action) => (dispatch, getState) => {

	// strip FileName from 
	let pathname = stripFileName(action.payload.pathname).folder;

	// dispatching action, which will result in [isFetching] flag be set to TRUE
	dispatch(requestFiles(pathname));

	// returning a promise created by calling [fetch]
	// > the Promise can be used if needed (i.e. if this action is used within another action)
	return fetch(`${BASE_URL}service/${pathname}`)
		// converting response to JSON
		.then(response => response.json())
		// dispatching an action (and using the json)
		.then(json=>dispatch(receiveFiles(json)));
}; // const fetchFiles = (action) => (dispatch, getState) => {...}

const receiveFiles = (payload) => ({
	type: FETCH_FILES_SUCCESS,
	payload: payload
});

/*-------------------------------------------------------------------------*//**
 * Activates previous/next of the currently displayed photosphere
 *
 * @param       {number}  direction  which sibling to show (-1=previous; 1=next)
 *
 * @return      {none}    none - here we dont't return anything ... nothing
 *                        makes sense
 *
 * @description this action id one form a thunk, since int needs to dispatch a
 *              new action
 */
const showSiblingSphere = (direction) => (dispatch, getState) => {

	var state = state = getState(),
		files = state.get('files');

	if(files.size === 1) {
	// IF there's only one sphere in the folder
	// > there are no siblings - quit
		return;
	}

	var stipResult = stripFileName(state.get('pathname')),
		// search for the current sphere file withing the file list ... we need
		// this to determine which is the previous and which is the next sibling
		fileIndex = files.findIndex((value, index, iter) => value.get('name') === stipResult.filename);

	if(direction===-1 && fileIndex === 0) {
	// IF this is the first file in the array
	// > wrap to the last file
		fileIndex = files.size;
	}

	if(direction===1 && fileIndex === files.size-1) {
	// IF this is the last file in the array
	// > wrap to the first file in the List
		fileIndex = -1;
	}

	// change path to point to the previous image
	dispatch( push(BASE_URL+stipResult.folder+files.get(fileIndex+direction).get('name')) );

}; // const showSiblingSphere = (direction) => (dispatch, getState) => {...}

/*-------------------------------------------------------------------------*//**
 * Strips filename form the given filepath
 *
 * @param      {(string|string[])}  pathname  pathname which may contain a
 *                                            filename
 * @return     {Object}             name of the file and pathname stripped of
 *                                  filename
 */
const stripFileName = (pathname) => {

	var pathnameLength = pathname.length,
		filename = null,
		indexOfImage = pathname.toLowerCase().indexOf('.jpg');

	indexOfImage = indexOfImage===-1 ? pathname.toLowerCase().indexOf('.jpeg') : indexOfImage;

	if(indexOfImage === pathnameLength-4 || indexOfImage === pathnameLength-5) {
	// IF the path points to a image
	// > remove image name from the URL
	//   AND fetch list of files withing the folder
		let pathParts = pathname.split('/');
		filename = pathParts.pop(); // removing the filename
		pathname = pathParts.join('/');
	}

	// strip the leading slash
	if(pathname[0]==='/') {
		pathname = pathname.substr(1);
	}

	return({
		folder:pathname + '/',
		filename
	});

}; // const getFileFolder = (pathname) => {...}

export {
	fetchFiles,
	showSiblingSphere,
	FETCH_FILES_REQUEST,
	FETCH_FILES_SUCCESS
};