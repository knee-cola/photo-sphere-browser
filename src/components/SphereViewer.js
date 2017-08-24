import React from 'react';
import ReactDOM from 'react-dom';
import { Viewer } from 'sphere-viewer';

var logo_png = require('../assets/logo.png'),
	icon_mobile_png = require('../assets/sphere-icon-mobile.png'),
	icon_desktop_png = require('../assets/sphere-icon-desktop.png');

export default class SphereViewer extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	// render method should return HTML
	render() {

		var pathname = BASE_URL+'images'+this.props.pathname;
		console.log('SphereViewer.render', pathname);

		if(!this.viewer) {
			this.viewer = this.viewFactory(pathname);
		} else {
			this.viewer.imgLoader.load([pathname])
		}

		return(<div>
				<div className="cmdPrevSphere" onClick={this.props.onPrevClick} title="Show previous sphere">
					<i className="material-icons">keyboard_arrow_left</i>
				</div>
				<div className="cmdNextSphere" onClick={this.props.onNextClick} title="Show next sphere">
					<i className="material-icons">keyboard_arrow_right</i>
				</div>
			</div>);
	} // render() {...}

	viewFactory(pathname) {

		var isMobile = window.devicePixelRatio!==1;

		var config = {
			// When the source image is passed as the [sphere] property
			// the textere will be applied onto a 3D sphere
			// (unless the [forceCube] flag is set - see below).
			// Here we can use the pre-loader feature by specifying
			// an array of images - see above how [imageUrls] is defined
			sphere: [pathname],
			// If the [forceCube] flag is set to TRUE, the texture will be
			// applied onto a 3D Cube instead of a 3D Sphere.
			//
			// NOTE: although rendering a 3D cube is much faster on weak devices,
			//       than using a 3D Sphere, this method will be hit
			//       with additional delay in the initial setup phase,
			//       since it image projection needs to be converted to cubical
			//       (rectilinear) projection.
			//       Performancewise it's better to use tiles or a texture atlas
			// forceCube: false,

			// (optional) setting up a logo, which will be displayed at the bottom 
			// of the sphere, which is usefull for hiding the triopod 
			logo:logo_png,
			logoDistance: -30,
			// (optional) defining hint, which will be displayed in the center 
			// of the screen and is hidden after the user clicks/taps the screen 
			hint: isMobile ? icon_mobile_png : icon_desktop_png,

			// (optional) overriding the default control config 
			control: {
			  autoRotate: true, autoRotateSpeed: 2, autoRotateDirection:-1
			}
		};

		return(new Viewer(config));
	}

	componentWillUnmount () {
		this.viewer.dispose();
		this.viewer = null;
	} // componentWillUnmount () {...}
};