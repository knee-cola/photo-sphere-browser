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

		  var baseUrl = BASE_URL; // [BASE_URL] is defined by webpack.DefinePlugin
		  var isMobile = window.devicePixelRatio!==1;

		  var config = {
		    // When the source image is passed as the [sphere] property
		    // the textere will be applied onto a 3D sphere
		    // (unless the [forceCube] flag is set - see below).
		    // Here we can use the pre-loader feature by specifying
		    // an array of images - see above how [imageUrls] is defined
		    sphere: [this.props.location.pathname.replace(baseUrl, baseUrl+'images/')],
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
		    },

		    // (optional) defining what the close button should contain
//		    closeButtonHtml: '<i class="cmdCloseSphere material-icons">highlight_off</i>'
		  };

		  this.viewer = new Viewer(config);

//		  sphere.addEventListener('closed', function() {
//		    // after the sphere is closed, display a button for showing the sphere
//		    var cmdShowSphere = document.createElement('button');
//		    cmdShowSphere.className = 'cmdShowSphere';
//		    cmdShowSphere.innerHTML = 'Show Sphere';
//		    cmdShowSphere.addEventListener('click', initSphere)
//
//		    document.getElementsByTagName('body')[0].appendChild(cmdShowSphere);   
//
//		  });
		return(<div></div>);
	} // render() {...}

	componentWillUnmount () {
		this.viewer.dispose();
		this.viewer = null;
	} // componentWillUnmount () {...}
};