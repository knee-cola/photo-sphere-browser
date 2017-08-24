import React from 'react';
import { connect } from 'react-redux'
import FileList from '../components/FileList'

const mapStateToProps = (state, ownProps) => {

	return({
		// we don't call [toJS] method here, since it would
		// make component re-render each time something unrelated
		// changes in the state (due to it returning a new Array each time)
		// ... this is done "lazy" in the [ComponentWrapper]
		files: state.get('files'),
		pathname: state.get('pathname')
	});
}; // const mapStateToProps = (state, ownProps) => {...}

const ComponentWrapper = function({pathname, files}) {

	var baseUrl = BASE_URL.substr(0, BASE_URL.length-1); // stripping the "/" from the end of the string

	// convert the immutable List to plain Array
	// ... this is done here at the point when it's decided that
	// the component needs to be re-rendered ... at this stage
	// calling [toJS] doens't hurt
	files = files===null ? null : files.toJS();

	if(files) {
		files = files.map(el => {
			el.filePath = baseUrl + pathname + el.name + (el.type==='folder'?'/':'');
			el.openState = 'closed';

			return(el);
		});

		if(pathname!=='/') {
		// IF current directory isn't the root one
		// > add ".." directory to the list, which will lead to one level up

			// removing the currenty active folder from path
			// (it's followed by an empty string)
			let filePath = pathname.split('/');
			filePath.splice(filePath.length-2, 1);
			filePath = filePath.join('/');

			files.unshift({
				name: '..',
				type: 'folder',
				filePath: baseUrl+filePath,
				date: '',
				openState: 'opened'
			});

		} // if(pathname!=='/') {...}
	}

	return(<FileList files={files} />);
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);