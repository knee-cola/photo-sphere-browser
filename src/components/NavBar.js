import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const baseUrl = '/photo-sphere-gallery/dist/'

export default class NavBar extends React.Component {
	render() {
		let pathname = this.props.location.pathname.replace(baseUrl,'').split('/').filter(el=>el!==''),
			accumulator = '';

		return(
			<p className="navBar">
				<Link to={baseUrl} key="root" className="material-icons">home</Link>
				{
					pathname.map(el => {
						accumulator+=el+'/';
						return(<span key={accumulator+'span'}> / <Link to={baseUrl+accumulator}> {el}</Link></span>);
					})
				}
			</p>);
	}
};

export { NavBar }