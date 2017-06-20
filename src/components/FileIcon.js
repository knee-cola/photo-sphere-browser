import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class FileIcon extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
		  openState:'closed'
		};
	}

	// render method should return HTML
	render() {
		var path;

		if(this.props.name=='..') {
		// AKO se radi o ikoni za povratak na prethodnu razinu foldera,
		// > pripremi pathname
			path = this.props.pathname.split('/');
			// removing the currenty active folder from path
			// (it's followed by an empty string)
			path.splice(path.length-2, 1);
			path = path.join('/');
		} else {
			path = this.props.pathname + this.props.name + (this.props.type==='folder'?'/':'');
		}

		return(<Link className={this.props.type+"Icon "+this.state.openState}
					title={this.props.date}
					onClick={this.handleClick.bind(this)} to={path}>{this.props.name}</Link>);
	}

	handleClick() {
		if(this.state.openState === "closed") {
			this.setState({openState:'opened'});
		} else {
			this.setState({openState:'closed'});
		}
	}
};