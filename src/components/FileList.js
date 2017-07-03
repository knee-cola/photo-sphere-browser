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
	componentWillMount() {
		// calling a method, which fetches data from the server
		this.getPathInfo();
	}

	componentWillReceiveProps() {
		// reseting the item list ... new will be loaded soon
		this.setState({
			items: null
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		// if the path is unchenged, don't do a thing
		var path = nextProps.location.pathname.replace(BASE_URL, '');
		return(path!==this.state.path);
	}

	componentDidUpdate() {
		this.getPathInfo();
	}

	getPathInfo() {
		var path = this.props.location.pathname.replace(BASE_URL, ''),
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