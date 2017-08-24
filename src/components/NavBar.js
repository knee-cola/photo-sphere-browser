import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const NavBar = ({ pathname }) => {

		var baseUrl = BASE_URL; // [BASE_URL] is defined by webpack.DefinePlugin

		pathname = pathname.replace(baseUrl,'').split('/').filter(el=>el!=='');

		var accumulator = '',
			lastPathEl = pathname.pop();

		return(
			<p className="navBar">
				<Link to={baseUrl} key="root" className="material-icons">home</Link>
				{
					pathname.map(el => {
						accumulator+=el+'/';
						return(<span key={accumulator+'span'}> / <Link to={baseUrl+accumulator}> {el}</Link></span>);
					})
				}
				<span key={accumulator+lastPathEl+'/span'}> / {lastPathEl}</span>
			</p>);
}

export { NavBar }