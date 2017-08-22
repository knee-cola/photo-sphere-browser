import React from 'react';
import FileIcon from './FileIcon';
import Request from 'superagent';

export default class FileList extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			path: null,
			items: null
		};
	}

	// this method is called automatically before a component will be rendered
	// but after the current (initial) location has been stored in [state]
	componentWillMount() {
		// calling a method, which fetches data from the server
		this.getPathInfo(this.props.location.pathname);
	}

	// this method is called when the route is changed
	componentWillReceiveProps() {
		// reseting the item list ... new will be loaded soon
		this.setState({
			items: null
		});

		this.getPathInfo(location.pathname); // [location] represents the next location (which is not yet stored in [state])
	}

	// this is called when something in state changes (including the location)
	// ... the function will determine if the component needs to be re-drawn
	shouldComponentUpdate(nextProps, nextState) {
		// if the path is unchenged, don't do a thing
		var path = nextProps.location.pathname.replace(BASE_URL, '');
		return(path!==this.state.path);
	}

	componentDidUpdate() {
	}

	getPathInfo(path) {

		if(path === void 0) {
			path = this.props.location.pathname;
		}

		var path = path.replace(BASE_URL, ''),
			url = `${BASE_URL}service/${path}`;

		// the [then] handler is defined as an arrow function =>
		// so that it's context is automatically bound to
		// component instance
		Request.get(url).then(response => {

			let items = JSON.parse(response.text);

			if(path!=='') {
				items.unshift({name:'..',type:'folder',date:'go one level up'});
			}

			this.setState({
				items: items,
				path: path
			});
		});
	}

	renderItem(el, ix) {
		return(<FileIcon type={el.type} date={el.date} name={el.name} key={el.name} pathname={this.props.location.pathname} />);
	}

	rednerList() {
		if(!this.state.items) {
			return(<p className="msg">loading</p>);
		} else if(this.state.items.length === 0) {
			return(<p className="msg">folder is empty</p>);
		} else {
			return(this.state.items.map(this.renderItem.bind(this)))
		}
	} // rednerList() {...}

	// render method should return HTML
	render() {
		return(<div className="fileList">
				{
					this.rednerList()
				}
				</div>);
	}
};