# Photo Sphere Browser

# Intro
This is a photo sphere browser and viewer. It scans a folder located on a web server for photo-sphere files and diplays them in a icon grid similar to Windows Explorer.

The browser/viewer supports:
* browsing folder structure
* sphere viewer (via https://github.com/knee-cola/SphereViewer)
* multiple navigation options
	* via clicking on the folder & file icons
	* via clicking on path links at the top of the page
	* via editing URL in browser's address bar
	* via clicking back & forward browser button (full browsing history is supported)

The following image show what the browser looks like:
![File & folder browser](https://rawgit.com/knee-cola/photo-sphere-browser/master/screenshot-icons.png)

The following image show what the sphere viewer looks like:
![Sphere viewer](https://rawgit.com/knee-cola/photo-sphere-browser/master/screenshot-viewer.png)

# Technical details
The client-side code of this solution is written in React (JavaScript), while the server-side code (web service) is written in C#.
This solution is intended to run on IIS, although it can easly be ported to another web server.

## Web service
This client-side app gets it's data from a server-side script (web service), which returns a list of files and folders contained within a specified path.

The server-side script returns JSON, which contains the following information:
* file name
* type ("file" or "folder")
* date - creation date

The folowing block contains an example of data returned by the script:

	[
		{"name":"01","type":"folder","date":"12.6.2017. 15:33:01"},
		{"name":"02","type":"folder","date":"12.6.2017. 15:33:16"},
		{"name":"tuneli.jpg","type":"file","date":"13.6.2017. 16:49:48"}
	]

## URL Rewrite
The user can access a folder or sphere by entering pathname in the browsers address input box.
For this to be possible, the website should have a URL rewrite feature be enabled.
Since this solution is written for IIS, this functionality is implemented in **web.config** file

## Photo sphere images location
The web service script expects to find photo-sphere images inside the "images" folder.
The "images" folder can contain other sub-folders, which means that files can be organized as wished.

The name of this folder is hardcoded, meaning that it can't be changed without editing the source.


## Dependencies
* ![React](https://github.com/facebook/react)
* ![Sphere viewer](https://rawgit.com/knee-cola/photo-sphere-browser/master/screenshot-viewer.png) & it's dependencies

# Building for production
The project is built with webpack, which means that the build process is configured inside the **webpack.config** file.

To build for production simply run the following command:

	webpack -p

Tu build for development run the follwoing command:

	webpack -d

In production environment the project is expected to be placed in the website **root folder**, while in development environemnt it is placed inside a **project folder**. This can be changed by editing the **webpack.config** file.